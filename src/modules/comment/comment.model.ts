import { 
  Model, 
  DataTypes, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey, 
  NonAttribute 
} from 'sequelize';
import Post from '../post/post.model';
import User from '../user/user.model';
import sequelize from '../../database/db'

class Comment extends Model<
  InferAttributes<Comment, { omit: 'post' | 'author' }>,
  InferCreationAttributes<Comment, { omit: 'post' | 'author' }>
> {
  declare id: CreationOptional<string>;
  declare content: string;
  declare postId: ForeignKey<Post['id']>;
  declare authorId: ForeignKey<User['id']>;

  // Définition des relations
  declare post: NonAttribute<Post>;
  declare author: NonAttribute<User>;

  static associate(models: any){
    this.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
    this.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

export default Comment;
