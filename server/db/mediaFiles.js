import { prisma } from "./index.js";
import bcrypt from "bcrypt";

export const createMediaFile = (mediaFile) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};
