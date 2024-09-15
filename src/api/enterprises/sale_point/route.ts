import { Router } from "express";
import { controller } from "./controller";
import { validateRunner } from "../../../helpers/express-validator";
import { salePointValidation } from "./util/sale-point.validation";
import { ValidationToken } from "../../../middlewares/validation-token.middleawre";
import { ValidateRole } from "../../../middlewares/role.middleware";
import { Roles } from "../../../utils/roles";

const salePointRouter = Router();

salePointRouter.get(
  "/",
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT, Roles.ADMIN]),
  controller.index
);
salePointRouter.get(
  "/:id",
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT, Roles.ADMIN]),
  controller.show
);
salePointRouter.post(
  "/",
  validateRunner(salePointValidation.create),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.create
);
salePointRouter.patch(
  "/:id",
  validateRunner(salePointValidation.update),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.edit
);
salePointRouter.delete(
  "/:id",
  validateRunner(salePointValidation.delete),
  ValidationToken,
  ValidateRole([Roles.SUPER_ADMIN, Roles.SUPPORT]),
  controller.delete
);

export default salePointRouter;
