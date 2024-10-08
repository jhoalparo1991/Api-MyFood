import { body, check } from "express-validator";

export const enterpriseCreateValidation = [
  body("tradeName")
    .exists()
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido")
    .isLength({
      min: 3,
    })
    .withMessage("El nombre de la empresa debe tener al menos 3 caracteres")
    .isLength({
      max: 50,
    })
    .withMessage(
      "El nombre de la empresa debe tener como máximo 50 caracteres"
    ),
  body("companyName")
    .exists()
    .notEmpty()
    .withMessage("La razon social es requerida")
    .isLength({
      min: 3,
    })
    .withMessage("La razon social debe tener al menos 3 caracteres")
    .isLength({
      max: 50,
    })
    .withMessage("La razon social debe tener como máximo 50 caracteres"),
  body("nif")
    .exists()
    .notEmpty()
    .withMessage("El NIF es requerido")
    .isLength({
      min: 1,
    })
    .withMessage("El NIF debe tener al menos 1 caracter")
    .isLength({
      max: 15,
    })
    .withMessage("El NIF debe tener como máximo 15 caracteres"),
];

export const enterpriseUpdateValidation = [
  check("tradeName")
    .optional()
    .isEmpty()
    .withMessage("El nombre de la empresa es requerido")
    .isLength({
      min: 3,
    })
    .withMessage("El nombre de la empresa debe tener al menos 3 caracteres")
    .isLength({
      max: 50,
    })
    .withMessage(
      "El nombre de la empresa debe tener como máximo 50 caracteres"
    ),
  check("companyName")
    .optional()
    .isEmpty()
    .withMessage("La razon social es requerida")
    .isLength({
      min: 3,
    })
    .withMessage("La razon social debe tener al menos 3 caracteres")
    .isLength({
      max: 50,
    })
    .withMessage("La razon social debe tener como máximo 50 caracteres"),
  check("nif")
    .optional()
    .not()
    .isEmpty()
    .withMessage("El NIF es requerido")
    .isLength({
      min: 1,
    })
    .withMessage("El NIF debe tener al menos 1 caracter")
    .isLength({
      max: 15,
    })
    .withMessage("El NIF debe tener como máximo 15 caracteres"),
];
