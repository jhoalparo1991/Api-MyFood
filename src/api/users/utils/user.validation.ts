import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

export const userValidations = {
  register: [
    check("fullname")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Fullname required")
    .isString(),
    check("document")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Document required")
    .isNumeric().withMessage('The document must be numeric')
    .isLength({min:8})
    .withMessage("The document must be at least 8 characters")
    .isLength({max:20})
    .withMessage('The document must be at least 20 characters'),
    check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"), 
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 20 }),
    check("sale_point_id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Salepoint is required")
    .isNumeric(),
  check("profile")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Profile is required"),
  check("is_active").optional().isBoolean()
  ],
  update :[
    check('id').exists().withMessage('The id must be numeric').isNumeric().withMessage('The id must be numeric'),
    check("fullname")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Fullname required")
    .isString(),
    check("document")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Document required")
    .isNumeric().withMessage('The document must be numeric')
    .isLength({min:8})
    .withMessage("The document must be at least 8 characters")
    .isLength({max:20})
    .withMessage('The document must be at least 20 characters'),
    check("email")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"), 
  check("password")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 20 }),
    check("sale_point_id")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Salepoint is required")
    .isNumeric(),
  check("profile")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Profile is required"),
  check("is_active").optional().isBoolean()
  ],
  id : [
    check("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .isNumeric().withMessage('The id must be numeric')
  ]
}