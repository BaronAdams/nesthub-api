// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { updatePropertyReviewBodyJsonSchema } from '../schemas/update-property-review.schema';

export type UpdatePropertyReviewDto = FromSchema<typeof updatePropertyReviewBodyJsonSchema>