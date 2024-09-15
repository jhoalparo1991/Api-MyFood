import { Router } from "express";
import { controller } from "./controller";
import { userValidations } from "./utils/user.validation";
import { ValidationToken } from "../../middlewares/validation-token.middleawre";
import { ValidateRole } from "../../middlewares/role.middleware";
import { Roles } from "../../utils/roles";
import { validate } from "../../helpers/validation-result";
import { validateRunner } from "../../helpers/express-validator";

const userRoutes = Router();

userRoutes.get(
  "/",
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.index
);
userRoutes.get(
  "/:id",
  validateRunner(userValidations.id),
  ValidationToken,
  controller.show
);
userRoutes.post(
  "/",
  validateRunner(userValidations.register),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.create
);
userRoutes.patch(
  "/:id",
  validateRunner(userValidations.update),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.edit
);
userRoutes.delete(
  "/disable/:id",
  validate(userValidations.id),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.disable
);

export default userRoutes;
