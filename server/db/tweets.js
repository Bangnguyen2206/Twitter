import { prisma } from "./index.js";
import bcrypt from "bcrypt";

export const createTweet = (tweetData) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};

export const getTweets = (params = {}) => {
  return prisma.tweet.findMany({
    ...params,
  });
};

export const getTweetById = (tweetId, params = {}) => {
  return prisma.tweet.findUnique({
    where: {
      ...params.where,
      id: tweetId,
    },
    ...params,
  });
};
