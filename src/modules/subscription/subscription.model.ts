import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Sequelize,
  NonAttribute,
} from 'sequelize';
import User from '../user/user.model';

class Subscription extends Model<
  InferAttributes<Subscription>,
  InferCreationAttributes<Subscription>
> {
  declare id: CreationOptional<string>;
  declare subscriberId: ForeignKey<User['id']>;
  declare type: string;

  declare subscriber?: NonAttribute<User>;

  // Initialisation du modèle
  static initialize(sequelize: Sequelize) {
      this.init(
          {
              id: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true,
              },
              subscriberId: {
                  type: DataTypes.UUID,
                  allowNull: false,
              },
              type: {
                  type: DataTypes.TEXT,
                  allowNull: false,
              }
          },
          {
              sequelize,
              tableName: 'subscriptions',
              timestamps: true, // Inclut createdAt et updatedAt
          }
      );
  }

  // Définition des associations
  static associate(models: any) {
      this.belongsTo(models.User, {
          foreignKey: 'subscriberId',
          as: 'subscriber',
      });
  }
}

export default Subscription;