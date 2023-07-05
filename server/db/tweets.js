import { prisma } from "./index.js";
import bcrypt from "bcrypt";

export const createTweet = (tweetData) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};
