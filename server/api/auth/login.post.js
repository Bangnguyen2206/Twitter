import { sendError } from "h3";
import { getUserByUsername } from "../../db/users.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../../../utils/jwt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;
  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  // Is the user registered
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Username is invalid" })
    );
  }
  //   Compare password
  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  // Generate Tokens
  //   Access token
  //   Refresh tokens
  const { accessToken, refreshToken } = generateTokens();

  return {
    user: user,
    doesThePasswordMatch,
  };
});
