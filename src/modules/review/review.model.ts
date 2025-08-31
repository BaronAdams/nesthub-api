import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
} from 'sequelize';
import User from '../user/user.model';
import sequelize from '../../database/db'

class Review extends Model<
    InferAttributes<Review, { omit: 'author'}>,
    InferCreationAttributes<Review, { omit: 'author'}>
> {
    declare id: CreationOptional<string>;
    declare authorId: ForeignKey<User['id']>;
    declare stars: number;
    declare comment: string;
    // Associations
    declare author?: NonAttribute<User>;

    static associate(models: any){
        this.belongsTo(models.User, {
            foreignKey: 'authorId',
            as: 'author',
        });
    }
}

Review.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'reviews',
        timestamps: true, // Inclut createdAt et updatedAt
    }
);

export default Review;
