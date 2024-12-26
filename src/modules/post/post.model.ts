import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, ForeignKey, NonAttribute } from 'sequelize';
import Admin from '../admin/admin.model';
import Comment from '../comment/comment.model';

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare content: string;
  declare adminId: ForeignKey<Admin['id']>;
  declare coverPic: string | null;
  declare views: CreationOptional<number>;
  declare comments?: NonAttribute<Comment[]>;

  // Méthode statique pour initialiser le modèle
  static initialize(sequelize: Sequelize) {
    this.init(
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
  }

  // Méthode statique pour définir les relations
  static associate(models:any) {
    // Association avec Admin : un post appartient à un admin
    this.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'author' });
    // Association avec Comment : un post a plusieurs commentaires
    this.hasMany(models.Comment, { foreignKey: 'postId' });
  }
}

// Appeler la méthode statique associate dans votre fichier principal de modèles
export default Post;


