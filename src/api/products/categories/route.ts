import { Router } from 'express'
import { controller } from './controller';
import {validation} from './utils/category.validation';

const categoryRouter = Router();

categoryRouter.get('/',controller.get)
categoryRouter.get('/:id',validation.idValidation,controller.findById)
categoryRouter.get('/:slug',controller.findBySlug)
categoryRouter.post('/',validation.createCategoryValidation,controller.create)
categoryRouter.patch('/:id',validation.createCategoryValidation,validation.idValidation,controller.update)
categoryRouter.delete('/:id',validation.idValidation,controller.delete)

export default categoryRouter;