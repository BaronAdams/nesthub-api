import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const updatePropertyReviewBodyJsonSchema = {
  type: "object",
  properties: {
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