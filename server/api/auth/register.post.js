import { sendError } from "h3";
import { createUser } from "../../../db/users";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
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
  };
  const user = await createUser(data);
  console.log("user=====", user);

  return {
    body: user,
  };
});
