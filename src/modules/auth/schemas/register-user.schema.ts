import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const registerUserBodyJsonSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "password"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
    },
    lastName: {
      type: "string",
      minLength: 1,
    },
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

