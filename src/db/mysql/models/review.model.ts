import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';
import { createId } from '@paralleldrive/cuid2';

export interface IReviewAttributes {
  id: string;
  userId: string;
  stars: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviewCreationAttributes extends Omit<IReviewAttributes, 'id'> {}

export class Review extends Model<IReviewAttributes, IReviewCreationAttributes> implements IReviewAttributes {
  public id!: string;
  public userId!: string;
  public stars!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => createId(),
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Review'
  }
);
