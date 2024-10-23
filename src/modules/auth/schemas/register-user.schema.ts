import { JSONSchema } from 'json-schema-to-ts';
import { AllowedSchema } from 'express-json-validator-middleware';

// Schéma JSON standard pour la génération de types
export const registerUserBodyJsonSchemaStandard = {
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

// Schéma JSON avec les messages d'erreur globalisés pour express-json-validator-middleware
export const registerUserBodyJsonSchemaWithErrors: AllowedSchema = {
  ...registerUserBodyJsonSchemaStandard,
  required: ["firstName", "lastName", "email", "password"] as string[],
  errorMessage: {
    required: {
      firstName: "Le nom de l'utilisateur est obligatoire",
      lastName: "Le prénom de l'utilisateur est obligatoire",
      email: "L'adresse email est réquise",
      password: "Le mot de passe est réquis",
    },
    properties: {
      firstName: "Le nom de l'utilisateur doit être une chaîne de caractères non vide",
      lastName: "Le prénom de l'utilisateur doit être une chaîne de caractères non vide",
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

