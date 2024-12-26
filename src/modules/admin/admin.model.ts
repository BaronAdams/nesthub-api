import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasMany,
  Sequelize,
} from 'sequelize';
import Post from '../post/post.model';

class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  declare id: CreationOptional<string>;
  declare email: string;

  // Initialisation du modèle
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        }
      },
      {
        sequelize,
        tableName: 'admins',
        timestamps: true, // Inclut createdAt et updatedAt
      }
    );
  }

  // Définition des associations
  static associate(models: { Post: typeof Post }) {
    this.hasMany(models.Post, {
      foreignKey: 'adminId',
      as: 'posts',
    });
  }
}

export default Admin;
