import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

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
    .withMessage("El documento debe ser numerico ")
    .isLength({min:8})
    .withMessage("El documento debe tener al menos 8 caracteres")
    .isLength({max:20})
    .withMessage('El documento debe tener al menos 20 caracteres'),
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
  check("active").optional().isBoolean()
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
  check("active").optional().isBoolean()
];

export const IdValidation = [
  check("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Debes indicar un id valido de mongodb")
];
