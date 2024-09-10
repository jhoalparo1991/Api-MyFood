import { NextFunction, Request, Response } from "express";
import { countCategories, createCategory, deleteCategory, getAll, getById, getBySlug, updateCategory } from "./service";
import { ICreateCategory } from "./utils/category.interface";
export const controller = {
    get: async(req:Request, res:Response, next:NextFunction) => {
        try {


            const page:number = Number(req.query.page) || 1;
            const limit:number = Number(req.query.limit) || 10;

            const categories = await getAll().skip((page -1) * limit).limit(limit).lean()

            // Get total categories
            const countDocuments = await countCategories();

            // Totalpages
            const totalPages = Math.ceil(countDocuments / limit);

            // Response
            res.status(200).json({
                data : categories,
                total: countDocuments,
                totalPages: totalPages,
                currentPage: page,
                limit
            })
        } catch (error:any) {
            next(error);
        }
    },
    findById: async(req:Request, res:Response, next:NextFunction) => {
        try {

            const {id} = req.params;

            const category = await getById(id);

            if(!category){
                throw new Error('Category not found');
            }

            // Response
            res.status(200).json({
                data : category,
            })
        } catch (error:any) {
            next(error);
        }
    },
    findBySlug: async(req:Request, res:Response, next:NextFunction) => {
        try {

            const {slug} = req.params;

            const category = await getBySlug(slug);

            if(!category){
                throw new Error('Category not found');
            }

            // Response
            res.status(200).json({
                data : category,
            })
        } catch (error:any) {
            next(error);
        }
    },
    create: async(req:Request, res:Response, next:NextFunction) => {
        try {


            const { name, description, is_active, visible_pv } = req.body;

            const data: ICreateCategory = {
                name,description,is_active,visible_pv
            };

            const result = await createCategory(data);

            if(!result){
                throw new Error('Category not created');
            }
                       
            // Response
            res.status(201).json({
                message: "category created successfully",
                data : result
            })
        } catch (error:any) {
            next(error);
        }
    },
    update: async(req:Request, res:Response, next:NextFunction) => {
        try {


            const { name, description, is_active, visible_pv } = req.body;
            const { id } = req.params;
            const data: ICreateCategory = {
                name,description,is_active,visible_pv
            };

            const result = await updateCategory(data, id);

            if(!result){
                throw new Error('Category not updated');
            }
                       
            // Response
            res.status(200).json({
                message: "category updated successfully",
                data : result
            })
        } catch (error:any) {
            next(error);
        }
    },
    delete: async(req:Request, res:Response, next:NextFunction) => {
        try {

            const { id } = req.params;

            const exist = await getById(id)
            if(!exist){
                throw new Error('Category not found')
            }

            await deleteCategory(id);

            // Response
            res.status(200).json({
                message: "category deleted successfully",
            })
        } catch (error:any) {
            next(error);
        }
    },
}