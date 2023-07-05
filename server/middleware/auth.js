import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../../utils/jwt.js";
import { sendError } from "h3";
import { getUserById } from "../db/users.js";

// For plugins, asyncData, fetch, nuxtServerInit and Middleware you can access it form context.$auth
export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/auth/user",
    "/api/user/tweets",
    "/api/tweets",
    "/api/tweets/:id",
  ];

  const isHandleByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(event.req.url);
  });

  if (!isHandleByThisMiddleware) {
    return;
  }

  const token = event.req.headers["authorization"]?.split(" ")[1];
  const decoded = decodeAccessToken(token);
  if (!decoded) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" })
    );
  }

  const userId = decoded.userId;

  try {
    const user = await getUserById(userId);

    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
