import { NextFunction, Request, Response } from "express";
import { development } from "../config/development";
import { logger } from "../config/winston";

export const errorHandle = (error:Error,req:Request, res:Response, next:NextFunction ) => {

    logger.error(error.stack);

    // let statusCode = res.statusCode ? res.statusCode : 500;
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message = error.message;

    // Ejemplo de errores específicos
    if (error.name === 'ValidationError') {
        statusCode = 400; // Error de validación
        message = Object.values(error).map(val => val.message).join(', ');
    } else if (error.name === 'CastError') {
        statusCode = 404; // Error cuando no se encuentra un ID válido en MongoDB
        message = `Recurso no encontrado con id: ${error.name}`;
    }

    
    res.status(statusCode).json({
        message: error.message,
        // Solo mostrar detalles del error en entorno de desarrollo
        stack: development.NODE_ENV === 'production' ? null : error.stack,
    });

}
