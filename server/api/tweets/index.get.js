import { getTweets } from "../../db/tweets.js";
import { tweetTransformer } from "../../transformers/tweet.js";

export default defineEventHandler(async (event) => {
  const tweets = await getTweets({
    include: {
      author: true,
      mediaFile: true,
      replies: {
        include: {
          author: true,
        },
      },
      replyTo: {
        include: {
          author: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  const data = tweets.map((tweet) => {
    return tweetTransformer(tweet);
  });
  return {
    tweets: data,
  };
});
