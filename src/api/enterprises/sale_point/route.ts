import { Router } from "express";
import { controller } from "./controller";
import { validateRunner } from "../../../helpers/express-validator";
import { salePointValidation } from "./util/sale-point.validation";

const salePointRouter = Router();

salePointRouter.get('/', controller.index)
salePointRouter.get('/:id', controller.show)
salePointRouter.post('/', validateRunner(salePointValidation.create) ,controller.create)
salePointRouter.patch('/:id', validateRunner(salePointValidation.update) ,controller.edit)
salePointRouter.delete('/:id', validateRunner(salePointValidation.delete) ,controller.delete)


export default salePointRouter;


