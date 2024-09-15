import { check } from "express-validator";

export const categoryValidation = {
  create: [
    check("name")
      .exists()
      .isLength({ min: 3, max: 50 })
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isString(),
    check("description")
      .optional()
      .isLength({ max: 50 })
      .withMessage("Max length description is 255 character")
      .isString(),
  ],
  update: [
    check("id")
      .exists()
      .notEmpty()
      .withMessage("Id is required")
      .isNumeric()
      .withMessage("Id must be numeric"),
    check("name")
      .optional()
      .isLength({ min: 3, max: 50 })
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isString(),
    check("description")
      .optional()
      .isLength({ max: 50 })
      .withMessage("Max length description is 255 character")
      .isString(),
  ],
  id: [
    check("id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Id is required")
      .isNumeric()
      .withMessage("Id must be numeric"),
  ],
};
