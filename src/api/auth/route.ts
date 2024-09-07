import { Router } from "express";
import { controller } from "./controller";

import { EmailValidation, IdValidation, LoginValidation, ResetPasswordValidation } from "./utils/auth.validation";

const authRoutes = Router();

authRoutes.post("/", LoginValidation, controller.login);
authRoutes.post("/forgot-password", EmailValidation, controller.forgotPassword);
authRoutes.patch("/reset-password/:token/:id", IdValidation,ResetPasswordValidation, controller.resetPassword);

export default authRoutes;
