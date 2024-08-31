import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';
import User from './user';
import Agent from './agent';

export interface IPropertyAttributes {
    id: string;
    type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    status: 'for_sale' | 'for_rent';
    furnished?: boolean;
    price: number;
    sellerId: string;
    agentId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPropertyCreationAttributes extends Optional<IPropertyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Property extends Model<IPropertyAttributes, IPropertyCreationAttributes> implements IPropertyAttributes {
    public id!: string;
    public type!: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    public status!: 'for_sale' | 'for_rent';
    public furnished?: boolean;
    public price!: number;
    public sellerId!: string;
    public agentId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Property.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('for_sale', 'for_rent'),
        allowNull: false,
    },
    furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sellerId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    agentId: {
        type: DataTypes.STRING,
        references: {
            model: Agent,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Property',
    timestamps: true,
});

export default Property;
