import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    userUsername: {
      type: String,
    },
    content: {
      type: String,
      max: 280,
      required: true,
    },
    img: {
      type: String,
    },
    userImg: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweets", TweetSchema);
export default Tweet;
