import { check } from "express-validator";

export const salePointValidation = {
  create: [
    check("enterprise_id").exists().not().isEmpty().withMessage("EnterpriseId is required").isNumeric(),
    check("name").exists().not().isEmpty().withMessage("Name is required"),
    check("nif").exists().not().isEmpty().withMessage("NIF is required").isLength({
        min: 10,
        max: 15
    }).withMessage({
        min: "NIF must be at least 10 characters long",
        max: "NIF must be at most 15 characters long"
    }),
  ],
  update : [
    check("id").exists().not().isEmpty().withMessage("Id is required").isNumeric(),
    check("enterprise_id").optional().not().isEmpty().withMessage("EnterpriseId is required").isNumeric(),
    check("name").optional().not().isEmpty().withMessage("Name is required"),
    check("nif").optional().not().isEmpty().withMessage("NIF is required").isLength({
        min: 10,
        max: 15
    }).withMessage({
        min: "NIF must be at least 10 characters long",
        max: "NIF must be at most 15 characters long"
    }),
  ],
  delete : [
    check("id").exists().not().isEmpty().withMessage("Id is required").isNumeric()
  ],
};
