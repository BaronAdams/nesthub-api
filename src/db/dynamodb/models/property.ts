import { createId } from '@paralleldrive/cuid2';
import * as dynamoose from 'dynamoose';
import { Schema } from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

// Interface for Property attributes
interface IPropertyAttributes extends Item {
  id: string;
  title: string;
  type: string;
  price: number;
  status: string;
  agencyId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const propertySchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => createId(),
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['land', 'villa', 'apartment', 'duplex', 'building', 'eventHall'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['forSale', 'forRent'],
      required: true,
    },
    agencyId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      required: true,
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model creation
const Property = dynamoose.model<IPropertyAttributes>('Property', propertySchema);

export default Property;
