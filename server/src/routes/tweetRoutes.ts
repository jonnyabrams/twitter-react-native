import express from "express";
import multer from "multer"

import { addTweet, getTweets, deleteTweet } from "../controllers/tweets";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.get("/", getTweets)
router.post("/", addTweet)
router.delete("/:id", deleteTweet)

export default router;