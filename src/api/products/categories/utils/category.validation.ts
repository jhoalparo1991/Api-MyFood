import {  check } from "express-validator";

export const validation = {
  createCategoryValidation: [
    check("name")
      .exists()
      .withMessage("El nombre es requerido")
      .isLength({ min: 3, max:50 })
      .withMessage({
        errors: {
          min: "El nombre debe tener al menos 3 caracteres",
          max: "El nombre debe tener como máximo 50 caracteres",
        }
      })
      .not()
      .isEmpty()
      .withMessage("Debes ingresar el nombre de la categoria")
      .isString()
  ],
  idValidation: [
    check("id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El id es requerido")
      .isMongoId()
      .withMessage("Debes indicar un id valido de mongodb")
  ],
};
