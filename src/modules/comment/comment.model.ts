import { Table, Column, Model, ForeignKey, DataType, PrimaryKey, Default, BelongsTo } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import Post from '../post/post.model';
import User from '../user/user.model';

export interface ICommentAttributes {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentCreationAttributes extends Partial<ICommentAttributes> {}

@Table({
  tableName: 'comments',
  timestamps: true, // CreatedAt and UpdatedAt columns will be generated automatically
})
class Comment extends Model<ICommentAttributes, ICommentCreationAttributes> implements ICommentAttributes {
  @PrimaryKey
  @Default(() => createId())
  @Column(DataType.STRING)
  public id!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public content!: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public postId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public authorId!: string;

  @BelongsTo(() => Post,"postId")
  public post!: Post;

  @BelongsTo(() => User,"authorId")
  public author!: User;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

export default Comment;

