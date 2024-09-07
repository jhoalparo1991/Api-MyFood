import { Router } from "express";
import { controller } from "./controller";

import { LoginValidation } from "./utils/auth.validation";

const authRoutes = Router();

authRoutes.post("/", LoginValidation, controller.login);

export default authRoutes;
