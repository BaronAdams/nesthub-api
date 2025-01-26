import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    Sequelize,
    NonAttribute,
} from 'sequelize';
import User from '../user/user.model';

class Review extends Model<
    InferAttributes<Review>,
    InferCreationAttributes<Review>
> {
    declare id: CreationOptional<string>;
    declare authorId: ForeignKey<User['id']>;
    declare stars: number;
    declare comment: string;

    declare author?: NonAttribute<User>;

    // Initialisation du modèle
    static initialize(sequelize: Sequelize) {
        this.init(
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
    }

    // Définition des associations
    static associate(models: any) {
        this.belongsTo(models.User, {
            foreignKey: 'authorId',
            as: 'author',
        });
    }
}

export default Review;
