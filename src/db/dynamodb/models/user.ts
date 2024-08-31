import { createId } from '@paralleldrive/cuid2';
import dynamoose, { Schema } from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';

// Interface for User attributes
interface IUserAttributes extends Item {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const userSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true, // Equivalent to primary key in DynamoDB
      default: () => createId(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'agent', 'admin'],
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
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Model creation
const User = dynamoose.model<IUserAttributes>('User', userSchema);

export default User;
