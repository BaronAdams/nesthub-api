import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
    HasManyCountAssociationsMixin
} from 'sequelize';
import User from '../user/user.model';
import sequelize from '../../database/db'
import Property from '../property/property.model';

class Offer extends Model<
    InferAttributes<Offer, { omit: 'buyer' | 'property' }>,
    InferCreationAttributes<Offer, { omit: 'buyer' | 'property' }>
> {
    declare id: CreationOptional<string>;
    declare propertyId: ForeignKey<Property['id']>;
    declare buyerId: ForeignKey<User['id']>;
    declare suggestedPrice: number;

    //Associations
    declare buyer: NonAttribute<User>;
    declare property: NonAttribute<Property>;

    static associate(models: any) {
        // Définition des associations
        this.belongsTo(models.User, {
            foreignKey: 'buyerId',
            as: 'buyer',
        });
        this.belongsTo(models.Property, {
            foreignKey: 'propertyId',
            as: 'property',
        });
    }
}

Offer.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        buyerId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        propertyId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        suggestedPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'offers',
        timestamps: true, // Inclut createdAt et updatedAt
    }
);

export default Offer;