// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { updateUserBodyJsonSchema } from '../schemas/update-user.schema';
export type UpdateUserDto = FromSchema<typeof updateUserBodyJsonSchema >