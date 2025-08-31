import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from 'sequelize';
import sequelize from '../../database/db'
import User from '../user/user.model';
import Property from '../property/property.model';

class PropertyReview extends Model<
  InferAttributes<PropertyReview, { omit: 'author' | 'property'}>,
  InferCreationAttributes<PropertyReview, { omit: 'author' | 'property'}>
> {
  declare id: CreationOptional<string>;
  declare authorId: ForeignKey<User['id']>;
  declare propertyId: ForeignKey<Property['id']>;
  declare stars: number;
  declare comment: string;

  declare author: NonAttribute<User>;
  declare property: NonAttribute<Property>;
  
  static associate(models: any){
    // Définition des associations
    this.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
    this.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
  }
}

PropertyReview.init(
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
    propertyId: {
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
    tableName: 'propertiesreviews',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

export default PropertyReview;
