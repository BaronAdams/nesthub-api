import { Model, Column, Table, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import Admin from '../admin/admin.model';
import Comment from '../comment/comment.model';
import { Optional } from 'sequelize';

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

@Table({
    tableName: 'posts',
    timestamps: true
})
class Post extends Model<IPostAttributes, IPostCreationAttributes> implements IPostAttributes {
    @Column({
        type: DataType.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    })
    public id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    public content!: string;

    @ForeignKey(() => Admin)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public adminId!: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    public views!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public coverPic?: string;

    @CreatedAt
    @Column
    public readonly createdAt!: Date;

    @UpdatedAt
    @Column
    public readonly updatedAt!: Date;

    @BelongsTo(() => Admin, 'adminId')
    public adminAuthor!: Admin;

    @HasMany(() => Comment, 'postId')
    comments!: Comment[];
}

export default Post;

