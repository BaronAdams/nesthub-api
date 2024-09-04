import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';
import Agency from './agency';

export interface IAgentAttributes {
    id: string;
    email: string;
    password: string;
    agencyId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAgentCreationAttributes extends Optional<IAgentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Agent extends Model<IAgentAttributes, IAgentCreationAttributes> implements IAgentAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public agencyId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Agent.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    agencyId: {
        type: DataTypes.STRING,
        references: {
            model: Agency,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Agent',
    timestamps: true,
    tableName:"agents"
});

export default Agent;
