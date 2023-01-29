import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Tweet from "../models/Tweet";

const secretKey = process.env.SECRET_KEY as string;

export const getTweets = async (req: Request, res: Response) => {
  // prop to show only user's own posts on their profile
  const userId = req.params.username;
  // get token
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, secretKey, async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token invalid");

    try {
      const tweets = await Tweet.find();

      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};

export const addTweet = async (req: Request, res: Response) => {
  const { content, img } = req.body;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, secretKey, async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    const newTweet = new Tweet({
      content,
      img,
      userId: userInfo.id,
      userName: userInfo.name,
      userUsername: userInfo.username,
      userImg: userInfo.img,
    });

    try {
      const savedTweet = await newTweet.save();

      res.status(201).json(savedTweet);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};

export const deleteTweet = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, secretKey, async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const tweet = await Tweet.findById(req.params.id);

      if (tweet?.userId === userInfo.id) {
        await tweet?.deleteOne();
        res.status(201).json("Post has been deleted");
      } else {
        return res.status(403).json("You can only delete your own tweets");
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};
