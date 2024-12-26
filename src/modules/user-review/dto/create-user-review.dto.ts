// Générer le type DTO à partir de la version standard
import { FromSchema } from 'json-schema-to-ts';
import { createUserReviewBodyJsonSchema } from '../schemas/create-user-review.schema';

export type CreateUserReviewDto = FromSchema<typeof createUserReviewBodyJsonSchema>;
