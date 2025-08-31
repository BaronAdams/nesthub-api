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

class Subscription extends Model<
    InferAttributes<Subscription>,
    InferCreationAttributes<Subscription>
> {
    declare id: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
    declare type: 'buyer' | 'seller';
    declare startDate: Date;
    declare endDate: Date;
    declare isActive: boolean;

    declare subscriber?: NonAttribute<User>;

    static associate(models: any) {
        // Définition des associations
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'subscriber',
        });
    }
}


Subscription.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('buyer', 'seller'),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        tableName: 'subscriptions',
        timestamps: false
    }
);

export default Subscription;