import { NextFunction, Request, Response } from "express";
import { development } from "../config/development";
import { logger } from "../config/winston";

export const errorHandle = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = error.message;

  if (error.name === "ValidationError" ) {
    statusCode = 400;
    message = Object.values(error)
      .map((val) => val.message)
      .join(", ");
  } else if (error.name === "CastError") {
    statusCode = 404;
    message = `Recurso no encontrado con id: ${error.name}`;
  }
  else if(error.name === 'PrismaClientValidationError'){
    statusCode = 400;
    message = "Error de validación de datos";
  }
  else if(error.name === 'PrismaClientKnownRequestError'){
    statusCode = 500;
    message = "Error desconocido";
  }

  res.status(statusCode).json({
    statusCode,
    message,
    type: error.name,
    stack: development.NODE_ENV === "production" ? null : error.stack,
  });
};
