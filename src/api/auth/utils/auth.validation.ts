import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

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
];

export const EmailValidation = [
  check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El Email es requerido")
    .isEmail()
    .withMessage("Debes ingresar un email valido"),
];

export const IdValidation = [
  check("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Debes indicar un id valido de mongodb"),
];

export const ResetPasswordValidation = [
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El password es requerido")
    .isLength({ min: 5, max: 20 }),
  check("repet_password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo repetir password es requerido")
    .isLength({ min: 5, max: 20 }),
  check("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Debes indicar un id valido de mongodb"),
];

export const changePasswordValidation = [
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El password es requerido")
    .isLength({ min: 5, max: 20 }),
  check("repet_password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo repetir password es requerido")
    .isLength({ min: 5, max: 20 }),
  check("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Debes indicar un id valido de mongodb"),
];
