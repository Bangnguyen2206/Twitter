import { getTweetById } from "../../db/tweets.js";
import { tweetTransformer } from "../../transformers/tweet.js";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFile: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          author: true,
          mediaFile: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });
  return {
    tweet: tweetTransformer(tweet),
  };
});
