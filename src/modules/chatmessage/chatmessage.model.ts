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
import User from '../user/user.model';
import Chat from '../chat/chat.model';

class ChatMessage extends Model<
    InferAttributes<ChatMessage, { omit: 'sender' | 'receiver'}>,
    InferCreationAttributes<ChatMessage, { omit: 'sender' | 'receiver'}>
> {
    declare id: CreationOptional<string>;
    declare message: string | null;
    declare senderId: ForeignKey<User['id']>;
    declare receiverId: ForeignKey<User['id']>;
    declare chatId: ForeignKey<Chat['id']>;

    // Définition des relations
    declare sender: NonAttribute<User>;
    declare receiver: NonAttribute<User>;

    // Initialisation du modèle
    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                message: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                senderId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    validate: {
                        isUUID: 4
                    }
                },
                receiverId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    validate: {
                        isUUID: 4
                    }
                },
                chatId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    validate: {
                        isUUID: 4
                    }
                }
            },
            {
                sequelize,
                tableName: 'chatmessages',
                timestamps: true, // Inclut createdAt et updatedAt
            }
        );
    }
    static associate(models: any) {
        this.belongsTo(models.Chat, { foreignKey: 'chatId' });
        this.belongsTo(models.User, { foreignKey: 'senderId', as: 'seller' });
        this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    }
}

export default ChatMessage;