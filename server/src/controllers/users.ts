import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // check if user exists
    const userExists = await User.find({ email });
    // still returns empty array if no user, so need to specify 1st index
    if (userExists[0]) return res.status(409).json("User already exists");

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // create new user in db
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save new user in db
    await newUser.save();

    // return user data
    res.status(201).json("User successfully created");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
