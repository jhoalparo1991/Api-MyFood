import { NextFunction, Request, Response } from "express";
import { logger } from "../config/winston";

export const ValidateRole = (role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role as string;

      if (!role.includes(userRole)) {
        throw new Error('Access denied')
      }
      next();
    } catch (error: any) {
      next(error)
    }
  };
};
