import { Router } from "express";
import { controller } from "./controller";
import { categoryValidation } from "./utils/category.validation";
import { validateRunner } from "../../../helpers/express-validator";
import { ValidateRole } from "../../../middlewares/role.middleware";

const categoryRouter = Router();

categoryRouter.get("/",ValidateRole,controller.index);
categoryRouter.get(
  "/:id",
  validateRunner(categoryValidation.id),
  ValidateRole,
  controller.show
);
categoryRouter.post(
  "/",
  validateRunner(categoryValidation.create),
  ValidateRole,
  controller.create
);
categoryRouter.patch(
  "/:id",
  validateRunner(categoryValidation.update),
  ValidateRole,
  controller.update
);
categoryRouter.delete(
  "/:id",
  validateRunner(categoryValidation.id),
  ValidateRole,
  controller.delete
);

export default categoryRouter;
