import { FromSchema } from 'json-schema-to-ts';
import { updatePropertyJsonSchema } from '../schemas/update-property.schema';

export type UpdatePropertyDto = FromSchema<typeof updatePropertyJsonSchema>;
