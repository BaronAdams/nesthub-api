import { FromSchema } from 'json-schema-to-ts';
import { createPostJsonSchema } from '../schemas/create-post.schema';

export type CreatePostDto = FromSchema<typeof createPostJsonSchema>;