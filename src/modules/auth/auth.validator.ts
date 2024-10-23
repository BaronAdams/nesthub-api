// import { Validator, ValidationError, AllowedSchema } from 'express-json-validator-middleware';
// import { Request, Response, NextFunction } from 'express';

// // const ajv = new Ajv({ allErrors: true, useDefaults: true });
// const validator = new Validator({ allErrors: true, useDefaults: true });

// // Schemas de validation
// const registerSchema: AllowedSchema = {
//     type: 'object',
//     properties: {
//         firstName: { type: 'string', minLength: 1 },
//         lastName: { type: 'string', minLength: 1 },
//         email: { type: 'string', format: 'email' },
//         password: {
//             type: 'string',
//             minLength: 6,
//             pattern: '^(?=.*[A-Z]{2,})(?=.*\\d).*$'
//         }
//     },
//     required: ['firstName', 'lastName', 'email', 'password'],
//     additionalProperties: false
// };

// const loginSchema: AllowedSchema = {
//     type: 'object',
//     properties: {
//         email: { type: 'string', format: 'email' },
//         password: {
//             type: 'string',
//             minLength: 6,
//             pattern: '^(?=.*[A-Z]{2,})(?=.*\\d).*$'
//         }
//     },
//     required: ['email', 'password'],
//     additionalProperties: false
// };

// // Middleware de validation
// export const validateRegister = validator.validate({ body: registerSchema });
// export const validateLogin = validator.validate({ body: loginSchema });

// // Middleware pour gérer les erreurs de validation
// export const validationErrorMiddleware = (
//     error: ValidationError,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     if (error instanceof ValidationError) {
//         return res.status(400).json({ errors: error.validationErrors });
//     }
//     next();
// };


import { body } from 'express-validator';

export const registerValidator = [
    body('firstName').notEmpty().withMessage("Le nom de l'utilisateur est obligatoire"),
    body('lastName').notEmpty().withMessage("Le prénom de l'utilisateur est obligatoire"),
    body('email').notEmpty().withMessage("L'adresse email est réquise").isEmail().withMessage("L'adresse email est invalide"),
    body('password').notEmpty().withMessage('Le mot de passe est réquis').isStrongPassword({minLength: 6,minUppercase: 2,minNumbers:1}).withMessage("Le mot de passe doit avoir au moins 6 caractères, avec au moins 1 chiffre et 2 lettre majuscules")
];

export const loginValidator = [
    body('email').notEmpty().withMessage("L'adresse email est réquise").isEmail().withMessage("L'adresse email est invalide"),
    body('password').notEmpty().withMessage('Le mot de passe est réquis').isStrongPassword({minLength: 6,minUppercase: 2,minNumbers:1}).withMessage("Le mot de passe doit avoir au moins 6 caractères, avec au moins 1 chiffre et 2 lettre majuscules")
];
