import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';
import Post from './post';

export interface ICommentAttributes {
    id: string;
    content: string;
    postId: string;
    authorName: string;
    authorEmail: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICommentCreationAttributes extends Optional<ICommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Comment extends Model<ICommentAttributes, ICommentCreationAttributes> implements ICommentAttributes {
    public id!: string;
    public content!: string;
    public postId!: string;
    public authorName!: string;
    public authorEmail!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postId: {
        type: DataTypes.STRING,
        references: {
            model: Post,
            key: 'id',
        },
        allowNull: false,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'comments',
    timestamps: true,
});

export default Comment;
