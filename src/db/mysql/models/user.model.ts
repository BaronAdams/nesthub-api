import { sequelize } from '../config'
import { DataTypes, Model, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';

export interface IUserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'buyer' | 'seller' | 'both' | 'agent' | 'agency_owner' | 'admin';
    profilePic?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastLoginDate?: Date;
    lastSessionDate?: Date;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role!: 'buyer' | 'seller' | 'both'| 'agent' | 'agency_owner' | 'admin';
    public profilePic?: string | undefined;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly lastLoginDate!: Date;
    public readonly lastSessionDate!: Date;
}

User.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('buyer', 'seller', 'both','agent' ,'agency_owner' ,'admin'),
        allowNull: false,
        defaultValue:'both'
    },
    profilePic:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: true
    },
    lastLoginDate:{
        type: DataTypes.DATE,
        allowNull: true
    },
    lastSessionDate:{
        type: DataTypes.DATE,
        allowNull: true
    }   
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

export default User;
