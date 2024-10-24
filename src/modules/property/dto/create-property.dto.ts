import { FromSchema } from 'json-schema-to-ts';
import { createPropertyJsonSchema } from '../schemas/create-property.schema';

export type CreatePropertyDto = FromSchema<typeof createPropertyJsonSchema>;
