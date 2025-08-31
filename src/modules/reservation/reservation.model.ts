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

class Reservation extends Model<
    InferAttributes<Reservation, { omit: 'buyer' | 'property' }>,
    InferCreationAttributes<Reservation, { omit: 'buyer' | 'property' }>
> {
    declare id: CreationOptional<string>;
    declare propertyId: ForeignKey<Property['id']>;
    declare buyerId: ForeignKey<User['id']>;
    declare startDate: Date | null;
    declare endDate: Date | null;

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

Reservation.init(
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
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'reservations',
        timestamps: true, // Inclut createdAt et updatedAt
    }
);

export default Reservation;