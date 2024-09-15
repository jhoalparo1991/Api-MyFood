import {  check } from "express-validator";

export const validation = {
  createCategoryValidation: [
    check("name")
      .exists()
      .isLength({ min: 3, max:50 })
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isString()
  ],
  idValidation: [
    check("id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Id is required")
      .isNumeric()
      .withMessage("Id must be numeric")
  ],
};
