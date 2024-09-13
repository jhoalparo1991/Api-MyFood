import { NextFunction, Request, Response } from "express";
import { logger } from "../config/winston";

export const  validate = (validations:any) => {
    return async (req:Request, res:Response, next:NextFunction) => {
      for (const validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
            logger.error(result.array(),'error')
            return res.status(400).json({ errors: result.array() });
        }
      }  
      next();
    };
  };
  