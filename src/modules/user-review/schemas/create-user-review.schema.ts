import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const createUserReviewBodyJsonSchema = {
  type: "object",
  required: ["authorId", "userId", "comment", "stars"],
  properties: {
    authorId: {
      type: "string",
      format:"uuid"
    },
    userId: {
      type: "string",
      format:"uuid"
    },
    comment: {
      type: "string",
      minLength: 1,
    },
    stars: {
      type: "number",
      minimum:1,
      exclusiveMaximum:5
    },
    additionalProperties: false,
  }
} as const satisfies JSONSchema;
