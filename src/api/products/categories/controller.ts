import { NextFunction, Request, Response } from "express";
import { service} from "./service";
import { CategoryDto } from "./dto/category.interface";

export const controller = {
    index: async(req:Request, res:Response, next:NextFunction) => {
        try {

            const result = await service.getAll();

            // Response
            res.json({
                status:200,
                result
            })
        } catch (error:any) {
            next(error);
        }
    },
    show: async(req:Request, res:Response, next:NextFunction) => {
        try {

            const {id} = req.params;

            const result = await service.getById(Number(id));

            if(!result){
                throw new Error('Category not found');
            }

            // Response
            res.json({
                status : 200,
                result
            })
        } catch (error:any) {
            next(error);
        }
    },
    create: async(req:Request, res:Response, next:NextFunction) => {
        try {


            const { name, description, is_active, visible_pv } = req.body;

            const data: CategoryDto = {
                name,description,is_active,visible_pv
            };

            const result = await service.create(data);

            if(!result){
                throw new Error('Category not created');
            }

            res.json({
                staus:201,
                message: "category created successfully",
                result
            })
        } catch (error:any) {
            next(error);
        }
    },
    update: async(req:Request, res:Response, next:NextFunction) => {
        try {
            const { name, description, is_active, visible_pv } = req.body;
            const { id } = req.params;
            const data: CategoryDto = {
                name,description,is_active,visible_pv
            };

            const result = await service.update(data, Number(id));

            if(!result){
                throw new Error('Category not updated');
            }
                       
            // Response
            res.json({
                status:200,
                message: "category updated successfully",
                result
            })
        } catch (error:any) {
            next(error);
        }
    },
    delete: async(req:Request, res:Response, next:NextFunction) => {
        try {

            const { id } = req.params;

            const exist = await service.getById(Number(id))
            if(!exist){
                throw new Error('Category not found')
            }

            await service.delete(Number(id));

            // Response
            res.json({
                status:200,
                message: "category deleted successfully",
            })
        } catch (error:any) {
            next(error);
        }
    },
}