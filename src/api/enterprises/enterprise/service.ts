import { PrismaClient } from "@prisma/client";
import { EnterpriseDto } from "./dto/enterprise.dto";

export const prismaSvc: PrismaClient = new PrismaClient();

export const findAll = async () => {
  return await prismaSvc.enterprise.findMany({
    include: {
      salePoint: {
        select: {
          id: true,
          name: true,
          nif: true,
        },
      },
    },
  });
};

export const findById = async (id: number) => {
  return await prismaSvc.enterprise.findUnique({
    where: {
      id,
    },
    include: {
      salePoint: {
        select: {
          id: true,
          name: true,
          nif: true,
        },
      },
    },
  });
};

export const findByNif = async (nif: string) => {
  return await prismaSvc.enterprise.findUnique({
    where: {
      nif,
    },
    include: {
      salePoint: {
        select: {
          id: true,
          name: true,
          nif: true,
        },
      },
    },
  });
};

export const existsEnterprise = async (nif: string, id: number) => {
  return await prismaSvc.enterprise.findFirst({
    where: {
      nif,
      AND: {
        id: {
          not: {
            equals: id,
          },
        },
      },
    },
  });
};

export const createEnterprise = async (data: EnterpriseDto) => {
  return await prismaSvc.enterprise.create({
    data: {
      tradeName: data.tradeName,
      companyName: data.companyName,
      nif: data.nif,
      address: data.address,
      country: data.country,
      city: data.city,
      postalCode: data.postalCode,
      phone: data.phone,
      cellphone: data.cellphone,
      email: data.email,
      website: data.website,
    },
  });
};

export const update = async (data: EnterpriseDto, id: number) => {
  return await prismaSvc.enterprise.update({
    where: {
      id,
    },
    data: {
      tradeName: data.tradeName,
      companyName: data.companyName,
      nif: data.nif,
      address: data.address,
      country: data.country,
      city: data.city,
      phone: data.phone,
      postalCode: data.postalCode,
      cellphone: data.cellphone,
      email: data.email,
      website: data.website,
    },
  });
};

export const deleteById = async (id: number) => {
  return await prismaSvc.enterprise.delete({
    where: { id },
  });
};
