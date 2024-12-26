// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { updateUserReviewBodyJsonSchema } from '../schemas/update-user-review.schema';

export type UpdateUserReviewDto = FromSchema<typeof updateUserReviewBodyJsonSchema>;