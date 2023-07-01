import { sendError } from "h3";
import { createUser } from "../../db/users.js";
import { userTransformer } from "../../../server/transformers/user.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password, repeatPassword, name } = body;
  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }
  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Passwords do not match" })
    );
  }

  const data = {
    email,
    password,
    username,
    name,
    profileImage: "https://picsum.photos/200/200",
  };

  const user = await createUser(data);

  return {
    body: userTransformer(user),
  };
});
