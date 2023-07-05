import formidable from "formidable";
import { createTweet } from "../../../db/tweets.js";

export default defineEventHandler(async (event) => {
  const form = formidable({});
  const response = new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({
        fields,
        files,
      });
    });
  });

  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    authorId: userId,
    text: "hello",
  };
  const tweet = await createTweet(tweetData);

  return {
    tweets: tweet,
  };
});
