import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const createPropertyReviewBodyJsonSchema = {
  type: "object",
  required: ["authorId", "propertyId", "comment", "stars"],
  properties: {
    authorId: {
      type: "string",
      format:"uuid"
    },
    propertyId: {
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