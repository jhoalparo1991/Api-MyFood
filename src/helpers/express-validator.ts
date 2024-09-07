import { NextFunction, Request, Response } from "express";
import { ContextRunner } from "express-validator";

export const validate = (validations:ContextRunner[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for(const validation of validations){
            const errors = await validation.run(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
        }
        next();
    }

}