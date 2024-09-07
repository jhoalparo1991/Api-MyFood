import { NextFunction, Request, Response } from "express";
import { logger } from "../config/winston";
import { verifyToken } from "../helpers/jsonwebtoken";
import { development } from "../config/development";

export const ValidationToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    const verify: any = verifyToken(token, development.JWT_SECRET_ACCESS_TOKEN);

    if (!verify) {
      throw new Error("Invalid token");
    }

    const payload = verify.payload;

    req.user = payload
    
    next();
  } catch (error: any) {
    logger.error(error.message, "error");
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
