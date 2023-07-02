import { prisma } from "./index.js";

export const createRefreshToken = (refreshToken) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  });
};
