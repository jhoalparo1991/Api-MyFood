import { Router } from "express";
import { controller } from "./controller";
import {
  CreateUserValidation,
  IdValidation,
  UpdateUserValidation,
} from "./utils/user.validation";
const userRoutes = Router();

userRoutes.get("/", controller.get);
userRoutes.get("/:id", IdValidation, controller.getOne);
userRoutes.post("/", CreateUserValidation, controller.create);
userRoutes.patch("/:id", UpdateUserValidation, IdValidation, controller.update);
userRoutes.delete("/disable/:id", IdValidation, controller.disable);

export default userRoutes;
