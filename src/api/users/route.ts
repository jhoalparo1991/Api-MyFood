import { Router } from "express";
import { controller } from "./controller";
import {
  CreateUserValidation,
  IdValidation,
  UpdateUserValidation,
} from "./utils/user.validation";
import { ValidationToken } from "../../middlewares/validation-token.middleawre";
import { ValidateRole } from "../../middlewares/role.middleware";
import { Roles } from "../../utils/roles";
const userRoutes = Router();

userRoutes.get(
  "/",
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.get
);
userRoutes.get("/:id", IdValidation, ValidationToken, controller.getOne);
userRoutes.post(
  "/",
  CreateUserValidation,
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.create
);
userRoutes.patch(
  "/:id",
  UpdateUserValidation,
  IdValidation,
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.update
);
userRoutes.delete(
  "/disable/:id",
  IdValidation,
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.disable
);

export default userRoutes;
