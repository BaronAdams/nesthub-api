import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';

class BlackListedToken extends Model<
  InferAttributes<BlackListedToken>,
  InferCreationAttributes<BlackListedToken>
> {
  declare id: CreationOptional<string>;
  declare token: string;

  // Initialisation du modèle
  static initialize(sequelize: Sequelize) {
    BlackListedToken.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'blacklistedtokens',
        timestamps: false, // Pas besoin de timestamps pour cette table
      }
    );
  }
}

export default BlackListedToken;
