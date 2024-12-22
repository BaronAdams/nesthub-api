import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la création de propriétés
export const createPostJsonSchema = {
  type: "object",
  required: ["title", "content", "adminId", "coverPic"],
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    content: {
      type: "string",
    },
    adminId: {
      type: "string",
    },
    coverPic: {
      type: "string",
    }
  },
  additionalProperties: false,
} as const satisfies JSONSchema;