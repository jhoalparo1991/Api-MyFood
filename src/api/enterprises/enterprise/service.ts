import { PrismaClient  } from "@prisma/client";
import { EnterpriseDto } from "./dto/enterprise.dto";

export const  prismaSvc : PrismaClient = new PrismaClient() 

export const  findAll = async () =>{
    return await prismaSvc.enterprise.findMany({
        include: {
            salePoint:{
                select:{
                    id: true,
                    name: true,
                    nif:true
                }
            }
        }
    });
}

export const  findById = async (id:number) =>{
    return await prismaSvc.enterprise.findUnique({
        where: {
            id
        },
        include: {
            salePoint:{
                select:{
                    id: true,
                    name: true,
                    nif:true
                }
            }
        }
    });
}

export const  findByNif = async (nif:string) =>{
    return await prismaSvc.enterprise.findUnique({
        where: {
            nif
        },
        include: {
            salePoint:{
                select:{
                    id: true,
                    name: true,
                    nif:true
                }
            }
        }
    });
}

export const  existsEnterprise = async (nif:string, id:number) =>{
    return await prismaSvc.enterprise.findFirst({
        where: {
            nif,
            AND:{
                id : {
                    not:{
                        equals:id
                    }
                }
            }
        }
    });
}

export const  createEnterprise = async(data:EnterpriseDto) =>{
    return await prismaSvc.enterprise.create({data})
}

export const  update = async(data:EnterpriseDto, id:number) =>{
    return await prismaSvc.enterprise.update({
        where: {
            id
        },
        data
    })
}

export const  deleteById = async(id:number)=>{
    return await prismaSvc.enterprise.delete({
        where:{id}
    })
}


