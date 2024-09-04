import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';

export interface ISubscriptionAttributes {
    id: string;
    name: string;
    price: number;
    agentLimit: number;
    propertyLimit: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISubscriptionCreationAttributes extends Optional<ISubscriptionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Subscription extends Model<ISubscriptionAttributes, ISubscriptionCreationAttributes> implements ISubscriptionAttributes {
    public id!: string;
    public name!: string;
    public price!: number;
    public agentLimit!: number;
    public propertyLimit!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Subscription.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    agentLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    propertyLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Subscription',
    timestamps: true,
});

export default Subscription;
