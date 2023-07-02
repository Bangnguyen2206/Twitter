import jwt from "jsonwebtoken";

// Difference between accessToken && refreshToken is expires time

const generateAccessToken = (user) => {
  //jwt.sign(payload, secretOrPrivateKey, [options, callback])
  //  payload: object literal
  //   secretOrPrivatekey
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret., {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "4h",
  });
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
// setcookie(name, value, expire, path, domain, secure, httponly);
export const sendRefreshToken = (event, token) => {
  setCookie(event.res, "refresh_token", token, {
    httpOnly: true,
    sameSite: true
  });
};
