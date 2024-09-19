import { PrismaClient } from "@prisma/client";
import { UserDto, UserDtoEdit } from "./dto/user.interface";

const prisma: PrismaClient = new PrismaClient();

export const service = {
  findAll: async () => {
    return await prisma.user.findMany();
  },
  findById: async (id: number) => {
    return await prisma.user.findFirst({ where: { id } });
  },
  findByEmail: async (email: string) => {
    return await prisma.user.findFirst({ where: { email } });
  },
  findByDocument: async (document: string) => {
    return await prisma.user.findFirst({ where: { document } });
  },
  findByEmailUpdate: async (id: number, email: string) => {
    return await prisma.user.findFirst({
      where: {
        email,
        AND: {
          id: {
            not: {
              equals: id,
            },
          },
        },
      },
    });
  },
  findByDocumentUpdate: async (id: number, document: string) => {
    return await prisma.user.findFirst({
      where: {
        document,
        AND: {
          id: {
            not: {
              equals: id,
            },
          },
        },
      },
    });
  },
  create: async (data: UserDto) => {
    return await prisma.user.create({
      data: {
        fullname: data.fullname,
        document: data.document,
        email: data.email,
        password: data.password,
        salePointId: data.sale_point_id,
        profile: data.profile,
        isActive: data.is_active,
      },
    });
  },
  update: async (id: number, data: UserDtoEdit) => {
    return await prisma.user.update({
      where: { id },
      data: {
        fullname: data.fullname,
        document: data.document,
        email: data.email,
        salePointId: data.sale_point_id,
        profile: data.profile,
      },
    });
  },
  disable: async (id: number) => {
    return await prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  },
  countUsers: async () => {
    return await prisma.user.count();
  },
};
