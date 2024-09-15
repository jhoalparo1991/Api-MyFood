import { PrismaClient } from "@prisma/client";
import { SalePointDto } from "./dto/sale-point.dto";

const prisma: PrismaClient = new PrismaClient();


export const services = {
    findAll: async()=>{
        return await prisma.salePoint.findMany({
            include: {
                enterprise:{
                    select:{
                        id:true,
                        tradeName:true,
                        companyName:true,
                        nif:true
                    }
                }
            },
            
        });
    },
    findById: async(id:number)=>{
        return await prisma.salePoint.findFirst({where:{id}});
    },
    findEnterpriseId: async(id:number)=>{
        return await prisma.enterprise.findFirst({where:{id}});
    },
    create: async(data:SalePointDto)=>{
        return await prisma.salePoint.create({data});
    },
    update: async(id:number,data:SalePointDto)=>{
        return await prisma.salePoint.update({where:{id},data});
    },
    delete: async(id:number)=>{
        return await prisma.salePoint.delete({where:{id}});
    },
}