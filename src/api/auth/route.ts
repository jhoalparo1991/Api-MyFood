import { Router } from "express";
import { controller } from "./controller";

import {
  changePasswordValidation,
  EmailValidation,
  IdValidation,
  LoginValidation,
  ResetPasswordValidation,
} from "./utils/auth.validation";
import { ValidateRole } from "../../middlewares/role.middleware";
import { ValidationToken } from "../../middlewares/validation-token.middleawre";
import { body } from "express-validator";
import { validate } from "../../helpers/validation-result";
const authRoutes = Router();

authRoutes.post(
  "/",
  validate(LoginValidation),
  controller.login
);
authRoutes.post("/forgot-password", validate(EmailValidation), controller.forgotPassword);
authRoutes.patch(
  "/reset-password/:token/:id",
  validate(ResetPasswordValidation),
  controller.resetPassword
);
authRoutes.patch(
  "/change-password",
  validate(changePasswordValidation),
  ValidationToken,
  controller.changePassword
);
authRoutes.get("/verify-token/:token", controller.verify);

export default authRoutes;
