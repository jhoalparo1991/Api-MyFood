import { CategoryDto } from "./dto/category.interface";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const service = {
  getAll: async () => {
    return await prisma.category.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            reference: true,
            type: true,
          },
        },
      },
    });
  },
  getById: async (id: number) => {
    return await prisma.category.findFirst({
      where: { id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            reference: true,
            type: true,
          },
        },
      },
    });
  },

  countCategories: async () => {
    return await prisma.category.count();
  },
  create: async (data: CategoryDto) => {
    return await prisma.category.create({ data });
  },
  update: async (data: CategoryDto, id: number) => {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },
  delete: async (id: number) => {
    return await prisma.category.delete({ where: { id } });
  },
};
