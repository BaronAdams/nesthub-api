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
      enum: ['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'],
    },
    status: {
      type: "string",
      enum: ['for_sale', 'for_rent', 'leased', 'sold'],
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
      type: "string",
      enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
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
