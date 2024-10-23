import { Validator, ValidationError, type AllowedSchema } from 'express-json-validator-middleware';
import { Request, Response, NextFunction } from 'express';
import { registerUserBodyJsonSchemaWithErrors } from '../schemas/register-user.schema';

const { validate } = new Validator({ strict:true });

// Middleware de validation
export const registerUserValidator = validate({
    body: registerUserBodyJsonSchemaWithErrors,
})

// Middleware pour gérer les erreurs de validation
export const validationErrorMiddleware = (
    error: ValidationError,
    req: Request,
    res: Response,
    next: NextFunction 
) => {
    if (error instanceof ValidationError) {
        return res.status(400).json({ errors: error.validationErrors });
    }
    next();
};
