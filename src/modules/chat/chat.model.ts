import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
  ForeignKey,
  NonAttribute
} from 'sequelize';
import Property from '../property/property.model';
import ChatMessage from '../chatmessage/chatmessage.model';

class Chat extends Model<
  InferAttributes<Chat,{ omit: 'messages'}>,
  InferCreationAttributes<Chat,{ omit: 'messages'}>
> {
  declare id: CreationOptional<string>;
  declare title: string | null;
  declare participants: string[];
  declare isGroup: boolean;
  declare propertyId: ForeignKey<Property['id']> | null;

  // Déclaration des associations
  declare messages: NonAttribute<ChatMessage[]>;

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
        propertyId:{
          type: DataTypes.UUID,
          allowNull:true
        }
      },
      {
        sequelize,
        tableName: 'chats',
        timestamps: true, // Inclut createdAt et updatedAt
      }
    );
  }
  static associate(models: any) {
    this.hasMany(models.ChatMessage, { foreignKey: 'chatId', as: 'messages' });
  }
}

export default Chat;
