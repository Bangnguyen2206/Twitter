import { prisma } from "./index.js";

export const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};
