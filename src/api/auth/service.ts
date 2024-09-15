import {  UserUpdatePassword } from "./utils/auth.interface";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const service = {
  signin: (email: string) => {
    return prisma.user.findFirst({ where: { email } });
  },
  findById: (id: number) => {
    return prisma.user.findFirst({ where: { id } });
  },
  resetPassword: async (data: UserUpdatePassword, id: number) => {
    return await prisma.user.update({
      where: { id },
      data: {
        password: data.password,
      },
    });
  },
  
};
