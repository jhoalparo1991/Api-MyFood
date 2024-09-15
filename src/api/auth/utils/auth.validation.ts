import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

export const authValidation = {
  loginValidation : [
    check("email")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    check("password")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5, max: 20 }),
  ],
  emailValidation : [
    check("email")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
  ],  
  idValidation : [
    check("id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Id is required")
      .isNumeric()
      .withMessage("Id is numeric"),
  ],
  resetPasswordValidation : [
    check("password")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5, max: 20 }),
    check("repet_password")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Repet password is required")
      .isLength({ min: 5, max: 20 }),
    check("id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Id is required")
      .isNumeric()
      .withMessage("Id must be numeric"),
  ],  
  changePasswordValidation : [
    check("password")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5, max: 20 }),
    check("repet_password")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Repet password is required")
      .isLength({ min: 5, max: 20 }),
    check("id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Id is required")
      .isNumeric()
      .withMessage("Id must be numeric"),
  ]
  
}
