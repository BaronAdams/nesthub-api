import { Validator } from 'express-json-validator-middleware';
import { loginUserBodyJsonSchemaWithErrors } from '../schemas/login-user.schema';

const { validate } = new Validator({ strict:true });

// Middleware de validation
export const loginUserValidator = validate({
    body: loginUserBodyJsonSchemaWithErrors,
})