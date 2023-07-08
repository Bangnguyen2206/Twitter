import { sendError } from "h3";
import { getRefreshTokenByToken } from "../../db/refreshToken.js";
import { decodeRefreshToken, generateTokens } from "../../../utils/jwt.js";
import { getUserById } from "../../db/users.js";

// jwt is a library used for generating tokens, there are long strings made up fof different characters.
// We have a secret_key in env, which should be private (hidden on the server) => sign method of jwt will be return a token made up of the secret and the payload.
// Decode or verify method to extract the payload stored in the token. Decode is not good for authentication because you do not need the secret code to extract the payload in the token. => a hacker could use a different secret code to generate a token
// With verify method: using your original secret to verufy that the token generated was generated with your secret code.

export default defineEventHandler(async (event) => {
  // Read counter cookie
  //   let cookies = getCookie(event, "refresh_token");
  //   Refresh token is created by token
  const cookies =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGEzNzhlZDBhNmI4MDQ2OWY3MzAxYmUiLCJpYXQiOjE2ODg3ODM2NjYsImV4cCI6MTY4ODc5ODA2Nn0.MANFLtI0BB5ibxNOIbpIal0CdV0waA1MRLMC_3YNUVg";
  const refreshToken = cookies;
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  //   Find token whether it is exist in database
  const rToken = await getRefreshTokenByToken(refreshToken);
  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  const token = decodeRefreshToken(refreshToken);
  try {
    const user = await getUserById(token.userId);

    const { accessToken } = generateTokens(user);

    return { access_token: accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
