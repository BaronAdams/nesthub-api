import { JSONSchema } from 'json-schema-to-ts';
import { AllowedSchema } from 'express-json-validator-middleware';

// Schéma JSON standard pour la génération de types
export const loginUserBodyJsonSchemaStandard = {
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

// Schéma JSON avec les messages d'erreur globalisés pour express-json-validator-middleware
export const loginUserBodyJsonSchemaWithErrors: AllowedSchema = {
  ...loginUserBodyJsonSchemaStandard,
  required: ["email", "password"] as string[],
  errorMessage: {
    required: {
      email: "L'adresse email est réquise",
      password: "Le mot de passe est réquis",
    },
    properties: {
      email: {
        format: "L'adresse email est invalide",
        minLength: "L'adresse email est réquise",
      },
      password: {
        minLength: "Le mot de passe doit avoir au moins 6 caractères",
        pattern: "Le mot de passe doit avoir au moins 1 chiffre et 2 lettres majuscules",
      },
    },
  },
};