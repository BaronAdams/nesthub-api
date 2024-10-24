import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la création de propriétés
export const createPropertyJsonSchema = {
  type: "object",
  required: ["title", "type", "status", "price", "agentId", "agencyId", "area", "images"],
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    type: {
      type: "string",
      enum: ['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'],
    },
    status: {
      type: "string",
      enum: ['for_sale', 'for_rent', 'leased', 'sold'],
    },
    place: {
      type: "string",
    },
    furnished: {
      type: "boolean",
    },
    price: {
      type: "number",
    },
    priceFrequency: {
      type: "string",
      enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
    },
    sellerId: {
      type: "string",
    },
    agentId: {
      type: "string",
    },
    agencyId: {
      type: "string",
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
      required: ["bedrooms", "livingRooms", "kitchens", "bathrooms"],
    },
    images: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
    },
  },
  allOf: [
    {
      if: {
        properties: { status: { const: 'for_rent' } },
      },
      then: {
        required: ['priceFrequency'],
      },
    },
    {
      if: {
        properties: { type: { const: 'land' } },
      },
      then: {
        properties: { furnished: { const: false } },
      },
    },
  ],
  additionalProperties: false,
} as const satisfies JSONSchema;



