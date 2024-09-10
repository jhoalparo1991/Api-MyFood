import { NextFunction, Request, Response } from "express";
import { validationResult as validation } from "express-validator";
import { logger } from "../config/winston";


export const validationResult = (req:Request, res:Response, next:NextFunction)=>{
    try {
        validation(req).throw()
        return next()
    } catch (err:any) {
        res.status(403)
        res.json({ errors: err.array() })
        // next(err)
    }
}