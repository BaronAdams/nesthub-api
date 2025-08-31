import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../database/db'

class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  declare id: CreationOptional<string>;
  declare email: string;

  static associate(models: any) {
    // Définition des associations
    this.hasMany(models.Post, {
      foreignKey: 'adminId',
      as: 'posts',
    });
  }
}

// Initialisation du modèle
Admin.init(
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

export default Admin;
