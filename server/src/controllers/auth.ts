import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // check if user does not exist
    const user = await User.find({ email });
    if (!user[0]) return res.status(404).json("User not found");

    // check password
    const passwordValid = bcrypt.compareSync(
      req.body.password,
      user[0].password
    );

    if (!passwordValid) return res.status(400).json("Wrong credentials");

    // generate token
    const token = jwt.sign(
      {
        id: user[0]._id,
        username: user[0].username,
        name: user[0].name,
        img: user[0].profilePic,
      },
      process.env.SECRET_KEY as string
    );

    // destructure out password
    // @ts-ignore
    const { password, ...others } = user[0]._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user: others, token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
