// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { registerUserBodyJsonSchemaStandard } from '../schemas/register-user.schema';
export type RegisterUserDto = FromSchema<typeof registerUserBodyJsonSchemaStandard>  & {
    role?: string; 
  };
