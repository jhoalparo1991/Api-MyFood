import { NextFunction, Request, Response } from "express";
import { validationResult as validation } from "express-validator";
import { logger } from "../config/winston";


export const validationResult = (req:Request, res:Response, next:NextFunction)=>{
    try {
        validation(req).throw();
        return next();
    } catch (error:any) {
        res.status(400);
        res.send({
            status: 400,
            errors : error.array()
        })
        logger.info(error.array(),'error');
    }
}