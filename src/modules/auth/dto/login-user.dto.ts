// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { loginUserBodyJsonSchema } from '../schemas/login-user.schema';
export type LoginUserDto = FromSchema<typeof loginUserBodyJsonSchema>