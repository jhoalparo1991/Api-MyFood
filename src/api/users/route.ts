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
import { validate } from "../../helpers/validation-result";

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
  validate(CreateUserValidation),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.create
);
userRoutes.patch(
  "/:id",
  validate(UpdateUserValidation),
  validate(IdValidation),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.update
);
userRoutes.delete(
  "/disable/:id",
  validate(IdValidation),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR]),
  controller.disable
);

export default userRoutes;
