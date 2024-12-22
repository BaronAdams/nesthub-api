import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const registerUserBodyJsonSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "password","location","phone"],
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
      pattern: "^(?=.*[A-Z]{1,})(?=.*\\d).+$",
    },
    location:{
      type: "string",
      enum: ['Yaoundé', 'Douala', 'Bafoussam', 'Buéa', 'Bamenda', 'Ebolowa','Bertoua','Ngaoundéré','Garoua','Maroua'],
    },
    phone:{
      type:"string",
      minLength: 9,
      maxLength: 9,
      pattern:"/[^0-9]/g"
    },
    additionalProperties: false,
  }
} as const satisfies JSONSchema;

