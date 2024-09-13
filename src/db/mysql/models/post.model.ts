import { sequelize } from '../config'
import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import Admin from './admin.model';

export interface IPostAttributes {
    id: string;
    title: string;
    content: string;
    adminId: string;
    coverPic?: string;
    views?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostCreationAttributes extends Optional<IPostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Post extends Model<IPostAttributes, IPostCreationAttributes> implements IPostAttributes {
    public id!: string;
    public title!: string;
    public content!: string;
    public coverPic!: string;
    public adminId!: string;
    public views!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    adminId: {
        type: DataTypes.STRING,
        references: {
            model: Admin,
            key: 'id',
        },
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    coverPic: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Post',
    tableName: "posts"
});

Admin.hasMany(Post, { foreignKey: 'adminId' });
Post.belongsTo(Admin, { foreignKey: 'adminId' });

export default Post;
