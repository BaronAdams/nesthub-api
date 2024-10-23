import { Validator } from 'express-json-validator-middleware';
import { registerUserBodyJsonSchemaWithErrors } from '../schemas/register-user.schema';

const { validate } = new Validator({ strict:true });

// Middleware de validation
export const registerUserValidator = validate({
    body: registerUserBodyJsonSchemaWithErrors,
})

