import { sendError } from "h3";
import { getUserByUsername } from "../../db/users.js";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "../../../utils/jwt";
import { userTransformer } from "../../../server/transformers/user.js";
import { createRefreshToken } from "../../db/refreshToken.js";

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
  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Password do not match" })
    );
  }

  // Generate Tokens
  //   Access token
  //   Refresh tokens
  const { accessToken, refreshToken } = generateTokens(user);
  //   Save it inside database
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });
  //   Add http pnly cookie

  sendRefreshToken(event, refreshToken);

  return {
    user: userTransformer(user),
    access_token: accessToken,
  };
});
