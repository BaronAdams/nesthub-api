// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { createPropertyReviewBodyJsonSchema } from '../schemas/create-property-review.schema';

export type CreatePropertyReviewDto = FromSchema<typeof createPropertyReviewBodyJsonSchema>;