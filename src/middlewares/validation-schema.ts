import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";

export const validateSchema = (schema:any) => (req:Request, res:Response, next:NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error:any) {
      return res
        .status(400)
        .json({ message: error.errors.map((err:any) => err.message) });
    }
  };