import { Router } from "express";
import { controller } from "./controller";

import { authValidation } from "./utils/auth.validation";
import { ValidationToken } from "../../middlewares/validation-token.middleawre";
import { validateRunner } from "../../helpers/express-validator";
const authRoutes = Router();

authRoutes.post(
  "/",
  validateRunner(authValidation.loginValidation),
  controller.login
);
authRoutes.post(
  "/forgot-password",
  validateRunner(authValidation.emailValidation),
  controller.forgotPassword
);
authRoutes.patch(
  "/reset-password/:token/:id",
  validateRunner(authValidation.resetPasswordValidation),
  controller.resetPassword
);
authRoutes.patch(
  "/change-password",
  validateRunner(authValidation.changePasswordValidation),
  ValidationToken,
  controller.changePassword
);
authRoutes.get("/verify-token", controller.verify);

export default authRoutes;
