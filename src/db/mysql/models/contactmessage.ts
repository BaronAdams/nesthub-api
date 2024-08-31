import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';

export interface IContactMessageAttributes {
    id: string;
    authorName: string;
    authorEmail: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IContactMessageCreationAttributes extends Optional<IContactMessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class ContactMessage extends Model<IContactMessageAttributes, IContactMessageCreationAttributes> implements IContactMessageAttributes {
    public id!: string;
    public authorName!: string;
    public authorEmail!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ContactMessage.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'ContactMessage',
    timestamps: true,
    tableName:"contactmessages"
});

export default ContactMessage;
