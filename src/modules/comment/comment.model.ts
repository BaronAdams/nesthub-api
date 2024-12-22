import { Table, Column, Model, ForeignKey, DataType, PrimaryKey, BelongsTo, IsUUID } from 'sequelize-typescript';
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
  @IsUUID(4)
  @Column({
    type:DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  public id!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public content!: string;

  @ForeignKey(() => Post)
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
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
}

export default Comment;

