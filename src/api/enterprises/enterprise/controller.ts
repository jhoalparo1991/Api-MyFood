import { NextFunction, Request, Response } from 'express'
import { createEnterprise, deleteById, existsEnterprise, findAll, findById, findByNif, update } from './service'
import { EnterpriseDto } from './dto/enterprise.dto'

export const controller  = {

    index : async (req:Request, res:Response, next:NextFunction)=>{
        try {
    
            const result = await findAll()
    
            return res.json({
                code: 200,
                result
            })
    
        } catch (error) {
            next(error)
        }
    },   
    show : async (req:Request, res:Response, next:NextFunction)=>{
        try {
            const { id } = req.params
    
    
            const result = await findById(Number(id))
    
            if(!result){
                throw new Error('Enterprise not found')
            }
    
            return res.json({
                code: 200,
                result
            })
    
        } catch (error) {
            next(error)
        }
    },
    create : async (req:Request, res:Response, next:NextFunction)=>{
        try {
    
            const data = req.body;
    
            const exist = await findByNif(data.nif)
    
            if(exist){
                throw new Error('This nif already exist')
            }
            
            const enterpriseData: EnterpriseDto = {
                tradeName: data.trade_name,
                companyName: data.company_name,
                nif: data.nif,
                address: data.address,
                country: data.country,
                city: data.city,
                postalCode: data.postal_code,
                phone: data.phone,
                cellphone: data.cellphone,
                email: data.email,
                website: data.website,
            }
    
            const enterprise = await createEnterprise(enterpriseData)
    
            return res.json({
                code: 201,
                message : 'Enterprise created successfully',
                enterprise
            })
    
        } catch (error) {
            next(error)
        }
    },
    edit : async (req:Request, res:Response, next:NextFunction)=>{
        try {
    
            const data = req.body;
            const id = req.params.id;

            const exist = await existsEnterprise(data.nif, Number(id))
    
            if(exist){
                throw new Error('This nif already exist')
            }
            
            const enterpriseData: EnterpriseDto = {
                tradeName: data.trade_name,
                companyName: data.company_name,
                nif: data.nif,
                address: data.address,
                country: data.country,
                city: data.city,
                postalCode: data.postal_code,
                phone: data.phone,
                cellphone: data.cellphone,
                email: data.email,
                website: data.website,
            }
    
            const enterprise = await update(enterpriseData,Number(id));
    
            return res.json({
                code: 200,
                message : 'Enterprise updated successfully',
                enterprise
            })
    
        } catch (error) {
            next(error)
        }
    },
    destroy : async (req:Request, res:Response, next:NextFunction)=>{
        try {
    
            const id = req.params.id;

            const exist = await findById(Number(id))
    
            if(!exist){
                throw new Error('Enterprise not found')
            }
                
            const enterprise = await deleteById(Number(id));
    
            return res.json({
                code: 200,
                message : 'Enterprise delete successfully',
                enterprise
            })
    
        } catch (error) {
            next(error)
        }
    }    
}


