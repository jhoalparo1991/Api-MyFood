import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validationResult } from "../../../helpers/validation-result";

export const CreateUserValidation = [
  check("fullname")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString(),
  check("type_doc")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de documento es requerido")
    .isString(),
  check("document")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El numero de documento es requerido")
    .isNumeric()
    .withMessage("El documento debe ser numerico "),
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
  check("rol")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El rol del usuario es requerido"),
  check("active").optional().isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validationResult(req, res, next);
  },
];

export const UpdateUserValidation = [
  check("fullname")
    .optional()
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString(),
  check("type_doc")
    .optional()
    .not()
    .isEmpty()
    .withMessage("El tipo de documento es requerido")
    .isString(),
  check("document")
    .optional()
    .not()
    .isEmpty()
    .withMessage("El numero de documento es requerido")
    .isNumeric()
    .withMessage("El documento debe ser numerico "),
  check("email")
    .optional()
    .not()
    .isEmpty()
    .withMessage("El Email es requerido")
    .isEmail()
    .withMessage("Debes ingresar un email valido"),
  check("rol")
    .optional()
    .not()
    .isEmpty()
    .withMessage("El rol del usuario es requerido"),
  check("active").optional().isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validationResult(req, res, next);
  },
];

export const IdValidation = [
  check("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Debes indicar un id valido de mongodb"),
  (req: Request, res: Response, next: NextFunction) => {
    validationResult(req, res, next);
  },
];
