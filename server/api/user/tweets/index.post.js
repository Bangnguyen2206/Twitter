import formidable from "formidable";
import { createTweet } from "../../../db/tweets.js";
import { createMediaFile } from "../../../db/mediaFiles.js";
import { tweetTransformer } from "../../../transformers/tweet.js";
import { uploadToCloudinary } from "../../../../utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const form = formidable({});
  const response = await new Promise((resolve, reject) => {
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

  const userId = event.context?.auth?.user?.id;
  const { fields, files } = response;
  const tweetData = {
    authorId: userId,
    text: fields.text[0],
  };
  const tweet = await createTweet(tweetData);
  const filePromises = Object.keys(files.image).map(async (key) => {
    const file = files.image[key].filepath;
    const cloudinaryResource = await uploadToCloudinary(file);
    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id,
    });
  });
  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});