import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from 'sequelize';
import User from '../user/user.model';
import sequelize from '../../database/db'

class UserReview extends Model<
  InferAttributes<UserReview>,
  InferCreationAttributes<UserReview>
> {
  declare id: CreationOptional<string>;
  declare authorId: ForeignKey<User['id']>;
  declare userId: ForeignKey<User['id']>;
  declare stars: number;
  declare comment: string;

  declare author: NonAttribute<User>;
  declare reviewedUser: NonAttribute<User>;

  static associate(models: any){
    // Définition des associations
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'reviewedUser',
    });
    this.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
  }
}

UserReview.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
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
    tableName: 'usersreviews',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

export default UserReview;