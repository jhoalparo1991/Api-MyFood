import { Router } from "express";
import { controller } from "./controller";

import { changePasswordValidation, EmailValidation, IdValidation, LoginValidation, ResetPasswordValidation } from "./utils/auth.validation";
import { ValidateRole } from "../../middlewares/role.middleware";
import { ValidationToken } from "../../middlewares/validation-token.middleawre";
const authRoutes = Router();

authRoutes.post("/", LoginValidation, controller.login);
authRoutes.post("/forgot-password", EmailValidation, controller.forgotPassword);
authRoutes.patch("/reset-password/:token/:id", IdValidation,ResetPasswordValidation, controller.resetPassword);
authRoutes.patch("/change-password",ValidationToken,changePasswordValidation, controller.changePassword);
authRoutes.get("/verify-token/:token",controller.verify);

export default authRoutes;
