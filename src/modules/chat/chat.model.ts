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
import Property from '../property/property.model';
import ChatMessage from '../chatmessage/chatmessage.model';
import User from '../user/user.model';

class Chat extends Model<
  InferAttributes<Chat,{ omit: 'seller' | 'buyer' | 'property' | 'messages'}>,
  InferCreationAttributes<Chat,{ omit: 'seller' | 'buyer' | 'property' | 'messages'}>
> {
  declare id: CreationOptional<string>;
  declare buyerId: ForeignKey<User['id']> ;
  declare sellerId: ForeignKey<User['id']> ;
  declare propertyId: ForeignKey<Property['id']> | null;
  // Déclaration des associations
  declare seller: NonAttribute<User>;
  declare buyer: NonAttribute<User>;
  declare property: NonAttribute<Property>;
  declare messages: NonAttribute<ChatMessage[]>;

  static associate(models: any){
    this.belongsTo(models.User, { 
      foreignKey: 'sellerId', 
      as: 'seller' 
    });
    this.belongsTo(models.User, { 
      foreignKey: 'buyerId', 
      as: 'buyer' 
    });
    this.hasMany(models.ChatMessage, { 
      foreignKey: 'chatId', 
      as: 'messages' 
    });
    this.belongsTo(models.Property, { 
      foreignKey: 'propertyId', 
      as: 'property' 
    });
  }
}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    buyerId:{
      type: DataTypes.UUID,
      allowNull:false
    },
    sellerId:{
      type: DataTypes.UUID,
      allowNull:false
    },
    propertyId:{
      type: DataTypes.UUID,
      allowNull:true
    },
  },
  {
    sequelize,
    tableName: 'chats',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);


export default Chat;
