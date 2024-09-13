import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import { sequelize } from '../config';
import Subscription from './subscription.model';
import User from './user.model';

export interface IAgencyAttributes {
    id: string;
    name: string;
    email: string;
    ownerId:string;
    subscriptionId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAgencyCreationAttributes extends Optional<IAgencyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Agency extends Model<IAgencyAttributes, IAgencyCreationAttributes> implements IAgencyAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public ownerId!: string;
    public subscriptionId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Agency.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ownerId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
        unique: true,
    },
    subscriptionId: {
        type: DataTypes.STRING,
        references: {
            model: Subscription,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Agency',
    tableName:"agencies"
});

Subscription.hasMany(Agency, { foreignKey: 'subscriptionId' });
Agency.belongsTo(Subscription, { foreignKey: 'subscriptionId' });

User.hasMany(Agency, { foreignKey: 'ownerId' });
Agency.belongsTo(User, { foreignKey: 'agencyId' });

export default Agency;
