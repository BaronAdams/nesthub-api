import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, ForeignKey, BelongsTo, NonAttribute } from 'sequelize';
import Post from '../post/post.model';
import User from '../user/user.model';

class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<string>;
  declare content: string;
  declare postId: ForeignKey<Post['id']>;
  declare authorId: ForeignKey<User['id']>;

  // Définition des relations
  declare post: NonAttribute<Post[]>;
  declare author: NonAttribute<User[]>;

  // Initialisation du modèle
  static initialize(sequelize: Sequelize) {
    this.init(
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
  }
  
  static associate(models: any) {
    this.belongsTo(models.Post, { foreignKey: 'postId' });
    this.belongsTo(models.User, { foreignKey: 'authorId' });
  }
}

// Définition des relations


export default Comment;
