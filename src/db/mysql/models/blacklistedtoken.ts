import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';

export interface IBlackListedTokenAttributes {
    id: string;
    token: string;
}

export interface IAdminCreationAttributes extends Optional<IBlackListedTokenAttributes, 'id'> {}

class BlackListedToken extends Model<IBlackListedTokenAttributes, IAdminCreationAttributes> implements IBlackListedTokenAttributes {
    public id!: string;
    public token!: string;
}

BlackListedToken.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'BlackListedToken',
    tableName:"blacklistedtokens"
});

export default BlackListedToken;