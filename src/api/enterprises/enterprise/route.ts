import { Router } from "express";
import { controller } from "./controller";
import { validate } from "../../../helpers/validation-result";
import {
  enterpriseCreateValidation,
  enterpriseUpdateValidation,
} from "./util/enterprise.validation";
import { ValidationToken } from "../../../middlewares/validation-token.middleawre";
import { ValidateRole } from "../../../middlewares/role.middleware";
import { Roles } from "../../../utils/roles";

const enterpriseRouter = Router();

enterpriseRouter.get(
  "/",
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.index
);
enterpriseRouter.get(
  "/:id",
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.show
);
enterpriseRouter.post(
  "/",
  validate(enterpriseCreateValidation),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.create
);
enterpriseRouter.patch(
  "/:id",
  validate(enterpriseUpdateValidation),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.edit
);

export default enterpriseRouter;
