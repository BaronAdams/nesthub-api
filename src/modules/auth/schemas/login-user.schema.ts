import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const loginUserBodyJsonSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      minLength: 1,
    },
    password: {
      type: "string",
      minLength: 6,
      pattern: "^(?=.*[A-Z]{2,})(?=.*\\d).+$",
    },
  },
  additionalProperties: false,
} as const satisfies JSONSchema;
