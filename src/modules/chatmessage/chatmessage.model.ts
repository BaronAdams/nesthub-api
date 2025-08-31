import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute
} from 'sequelize';
import sequelize from '../../database/db'
import User from '../user/user.model';
import Chat from '../chat/chat.model';

class ChatMessage extends Model<
    InferAttributes<ChatMessage, { omit: 'sender' | 'chat' }>,
    InferCreationAttributes<ChatMessage, { omit: 'sender' | 'chat' }>
> {
    declare id: CreationOptional<string>;
    declare message: string | null;
    declare senderId: ForeignKey<User['id']>;
    declare chatId: ForeignKey<Chat['id']>;
    
    // Définition des relations
    declare sender: NonAttribute<User>;
    declare chat: NonAttribute<Chat>;

    static associate(models: any){
        this.belongsTo(models.Chat, { foreignKey: 'chatId', as:'chat' });
        this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    }
}

ChatMessage.init(
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

export default ChatMessage;