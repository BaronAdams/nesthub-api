// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { registerUserBodyJsonSchema } from '../schemas/register-user.schema';
export type RegisterUserDto = FromSchema<typeof registerUserBodyJsonSchema>  & {
    role: 'buyer' | 'seller' | 'both' | 'agent' | 'agency_owner' | 'agency_admin' | 'admin'; 
    color?: string
  };
