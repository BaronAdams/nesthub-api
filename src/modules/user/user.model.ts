import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  NonAttribute,
  HasManyCountAssociationsMixin
} from 'sequelize';
import Property from '../property/property.model';
import Comment from '../comment/comment.model';
import { generateColor } from '../../common/utils/helper';
import PropertyReview from '../propertyreview/propertyreview.model';
import UserReview from '../user-review/user-review.model';

// Types pour les langues et les préférences
type LangLevel = "Débutant" | "Courant" | "Expert";
type Preferences = {
  types: string[],
  minBudget: number,
  maxBudget: number,
};

// Modèle `User`
class User extends Model<
  InferAttributes<User, { omit: 'properties' | 'comments' | 'propertiesReviewsWritten' | 'usersReviewsWritten' | 'usersReviewsReceived' }>,
  InferCreationAttributes<User, { omit: 'properties' | 'comments' | 'propertiesReviewsWritten' | 'usersReviewsWritten' | 'usersReviewsReceived' }>
> {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare languages: {
    french: LangLevel;
    english: LangLevel;
  } | null;
  declare preferences: Preferences | null;
  declare location: string;
  declare birthday: Date | null;
  declare color: CreationOptional<string>;
  declare role: 'buyer' | 'seller' | 'both' | 'admin';
  declare isOnline: CreationOptional<boolean>;
  declare lastSeen: CreationOptional<Date>;
  declare profilePic: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: Date | null;
  declare lastLoginDate: Date | null;
  declare lastSessionDate: Date | null;
  declare stars?: number;

  // Associations
  declare properties?: NonAttribute<Property[]>;
  declare comments?: NonAttribute<Comment[]>;
  declare propertiesReviewsWritten?: NonAttribute<PropertyReview[]>;
  declare usersReviewsWritten?: NonAttribute<UserReview[]>;
  declare usersReviewsReceived?: NonAttribute<UserReview[]>;

  // Méthodes pour les relations `HasMany`
  // declare addProperty: HasManyAddAssociationMixin<Property, string>;
  // declare getProperties: HasManyGetAssociationsMixin<Property>;
  // declare hasProperty: HasManyHasAssociationMixin<Property, string>;
  // declare countProperties: HasManyCountAssociationsMixin;
  // declare createProperty: HasManyCreateAssociationMixin<Property, 'sellerId'>;
  
  // declare addComment: HasManyAddAssociationMixin<Comment, string>;
  // declare getComments: HasManyGetAssociationsMixin<Comment>;
  // declare countComments: HasManyCountAssociationsMixin;
  // declare createComment: HasManyCreateAssociationMixin<Comment, 'authorId'>;
  
  // declare addPropertyReview: HasManyAddAssociationMixin<PropertyReview, string>;
  // declare getPropertyReviews: HasManyGetAssociationsMixin<PropertyReview>;
  // declare countPropertyReviews: HasManyCountAssociationsMixin;
  // declare createPropertyReview: HasManyCreateAssociationMixin<PropertyReview, 'authorId'>;

  // declare addUserReview: HasManyAddAssociationMixin<UserReview, string>;
  // declare getUserReviews: HasManyGetAssociationsMixin<UserReview>;
  // declare countUserReviews: HasManyCountAssociationsMixin;
  // declare createUserReview: HasManyCreateAssociationMixin<UserReview, 'authorId'>;

  // declare getReviews: HasManyGetAssociationsMixin<UserReview>;
  // declare countReviews: HasManyCountAssociationsMixin;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        languages: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        preferences: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthday: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: generateColor(),
        },
        role: {
          type: DataTypes.ENUM,
          values:['buyer', 'seller', 'both', 'admin'],
          allowNull: false,
          defaultValue: 'both'
        },
        isOnline: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        lastSeen: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        profilePic: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        stars: {
          type: DataTypes.FLOAT,
          get(this: User){
            if(!this.usersReviewsReceived || this.usersReviewsReceived.length === 0){
              return 0
            }
            let totalStars = this.usersReviewsReceived.reduce((sum,review)=> sum + review.stars, 0)
            return totalStars / this.usersReviewsReceived.length
          }
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt:{
          type: DataTypes.DATE,
          allowNull:true
        },
        lastLoginDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        lastSessionDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
      }
    );
  }

  static associate(models: any) {
    this.hasMany(models.Property, { foreignKey: 'sellerId', as: 'properties' });
    this.hasMany(models.Comment, { foreignKey: 'authorId', as: 'comments' });
    this.hasMany(models.PropertyReview, { foreignKey: 'authorId', as: 'propertiesReviewsWritten' });
    this.hasMany(models.UserReview, { foreignKey: 'authorId', as: 'usersReviewsWritten' });
    this.hasMany(models.UserReview, { foreignKey: 'userId', as: 'usersReviewsReceived' });
  }
}

export default User;
