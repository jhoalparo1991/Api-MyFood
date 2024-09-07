import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validationResult } from "../../../helpers/validation-result";

export const LoginValidation = [
  check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El Email es requerido")
    .isEmail()
    .withMessage("Debes ingresar un email valido"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El password es requerido")
    .isLength({ min: 5, max: 20 }),
  (req: Request, res: Response, next: NextFunction) => {
    validationResult(req, res, next);
  },
];