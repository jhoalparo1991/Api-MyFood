import { body, check } from "express-validator";

export const enterpriseCreateValidation = [
    body('trade_name').exists().notEmpty().withMessage({
        message: 'El nombre de la empresa es requerido',
    }).isLength({
        min: 3,
    }).withMessage({
        message: 'El nombre de la empresa debe tener al menos 3 caracteres',
    }).isLength({
        max: 50
    }).withMessage({
        message: 'El nombre de la empresa debe tener como máximo 50 caracteres',
    }),
    body('company_name').exists().notEmpty().withMessage({
        message: 'La razon social es requerida',
    }).isLength({
        min: 3,
    }).withMessage({
        message: 'La razon social debe tener al menos 3 caracteres',
    }).isLength({
        max: 50
    }).withMessage({
        message: 'La razon social debe tener como máximo 50 caracteres',
    }),
    body('nif').exists().notEmpty().withMessage({
        message: 'El NIF es requerido',
    }).isLength({
        min: 1,
    }).withMessage({
        message: 'El NIF debe tener al menos 1 caracter',
    }).isLength({
        max: 15
    }).withMessage({
        message: 'El NIF debe tener como máximo 15 caracteres',
    })
];

export const enterpriseUpdateValidation = [
    
    check('trade_name').optional().isEmpty().withMessage({
        message: 'El nombre de la empresa es requerido',
    }).isLength({
        min: 3,
    }).withMessage({
        message: 'El nombre de la empresa debe tener al menos 3 caracteres',
    }).isLength({
        max: 50
    }).withMessage({
        message: 'El nombre de la empresa debe tener como máximo 50 caracteres',
    }),
    check('company_name').optional().isEmpty().withMessage({
        message: 'La razon social es requerida',
    }).isLength({
        min: 3,
    }).withMessage({
        message: 'La razon social debe tener al menos 3 caracteres',
    }).isLength({
        max: 50
    }).withMessage({
        message: 'La razon social debe tener como máximo 50 caracteres',
    }),
    check('nif').optional().isEmpty().withMessage({
        message: 'El NIF es requerido',
    }).isLength({
        min: 1,
    }).withMessage({
        message: 'El NIF debe tener al menos 1 caracter',
    }).isLength({
        max: 15
    }).withMessage({
        message: 'El NIF debe tener como máximo 15 caracteres',
    })
];