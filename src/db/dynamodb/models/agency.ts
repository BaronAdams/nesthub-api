import { createId } from '@paralleldrive/cuid2';
import * as dynamoose from 'dynamoose';
import { Schema } from "dynamoose";
import { Item } from 'dynamoose/dist/Item';

// Interface for Agency attributes
interface IAgencyAttributes extends Item {
  id: string;
  name: string;
  subscriptionPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const agencySchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => createId(),
    },
    name: {
      type: String,
      required: true,
    },
    subscriptionPlan: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
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
const Agency = dynamoose.model<IAgencyAttributes>('Agency', agencySchema);

export default Agency;
