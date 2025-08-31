import { 
  Model, 
  DataTypes, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey, 
  NonAttribute 
} from 'sequelize';
import Admin from '../admin/admin.model';
import Comment from '../comment/comment.model';
import sequelize from '../../database/db'

class Post extends Model<InferAttributes<Post, { omit: 'comments' }>, 
InferCreationAttributes<Post, { omit: 'comments' }>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare content: string;
  declare adminId: ForeignKey<Admin['id']>;
  declare coverPic: string | null;
  declare views: CreationOptional<number>;
  // Associations
  declare comments?: NonAttribute<Comment[]>;

  static associate(models: any){
    this.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'author' });
    this.hasMany(models.Comment, { foreignKey: 'postId', as:'comments' });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    coverPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

export default Post;


