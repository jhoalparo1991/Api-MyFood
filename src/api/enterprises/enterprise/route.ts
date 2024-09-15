import { Router } from "express";
import { controller } from "./controller";
import { validate } from "../../../helpers/validation-result";
import { enterpriseCreateValidation, enterpriseUpdateValidation } from "./util/enterprise.validation";

const enterpriseRouter = Router();

enterpriseRouter.get('/',controller.index);
enterpriseRouter.get('/:id',controller.show);
enterpriseRouter.post('/',validate(enterpriseCreateValidation),controller.create);
enterpriseRouter.patch('/:id',validate(enterpriseUpdateValidation),controller.edit);

export default enterpriseRouter; 

