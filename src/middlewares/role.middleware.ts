import { NextFunction, Request, Response } from "express";
import { logger } from "../config/winston";

export const ValidateRole = (role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role as string;

      if (!role.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error: any) {
      logger.error(error.message, "error");
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  };
};
