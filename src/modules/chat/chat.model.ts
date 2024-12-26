import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize
} from 'sequelize';

class Chat extends Model<
  InferAttributes<Chat>,
  InferCreationAttributes<Chat>
> {
  declare id: CreationOptional<string>;
  declare title: string | null;
  declare participants: string[];
  declare isGroup: boolean;

  // Initialisation du modèle
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
          allowNull: true, // Optionnel si ce n'est pas un groupe
        },
        participants: {
          type: DataTypes.ARRAY(DataTypes.UUID),
          allowNull: false, // Les participants sont obligatoires
        },
        isGroup: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, // Par défaut, ce n'est pas un groupe
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'chats',
        timestamps: true, // Inclut createdAt et updatedAt
      }
    );
  }
}

export default Chat;
