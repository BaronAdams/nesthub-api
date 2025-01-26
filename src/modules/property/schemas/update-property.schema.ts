import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la mise à jour des propriétés
export const updatePropertyJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    property_type: {
      type: "string",
      enum: ['Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison'],
    },
    status: {
      type: "string",
      enum: ['A vendre', 'A louer', 'Indisponible', 'Déja pris'],
    },
    city: {
      type: "string",
    },
    hood: {
      type: "string",
    },
    furnished: {
      type: "boolean",
    },
    price: {
      type: "number",
    },
    priceFrequency: {
      type: "object",
      oneOf:[
        {
          properties:{
            jours: { type: "number" }
          },
          required:["jours"],
          additionalProperties: false
        },
        {
          properties:{
            semaines: { type: "number" }
          },
          required:["semaines"],
          additionalProperties: false
        },
        {
          properties:{
            mois: { type: "number" }
          },
          required:["mois"],
          additionalProperties: false
        },
        {
          properties:{
            années: { type: "number" }
          },
          required:["années"],
          additionalProperties: false
        }
      ]
    },
    area: {
      type: "number",
    },
    description: {
      type: "string",
    },
    rooms: {
      type: "object",
      properties: {
        bedrooms: { type: "number" },
        livingRooms: { type: "number" },
        kitchens: { type: "number" },
        bathrooms: { type: "number" },
      },
    },
    images: {
      type: "array",
      items: { type: "string" },
      minItems: 4,
      maxItems:10
    },
  },
  allOf: [
    {
      if: {
        properties: { status: { const: 'A louer' } },
      },
      then: {
        required: ['priceFrequency'],
      },
    },
    {
      if: {
        properties: { type: { const: 'Terrain' } },
      },
      then: {
        properties: { furnished: { const: false } },
      },
    },
  ],
  additionalProperties: false,
} as const satisfies JSONSchema;
