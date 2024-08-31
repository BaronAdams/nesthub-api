import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';

export interface IAdminAttributes {
    id: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAdminCreationAttributes extends Optional<IAdminAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Admin extends Model<IAdminAttributes, IAdminCreationAttributes> implements IAdminAttributes {
    public id!: string;
    public email!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Admin.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'Admin',
    timestamps: true,
    tableName:"admins"
});

export default Admin;
