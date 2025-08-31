import { 
  DataTypes, 
  Model, 
  CreationOptional, 
  InferAttributes, 
  InferCreationAttributes 
} from 'sequelize';
import sequelize from '../../database/db'

class ContactMessage extends Model<
  InferAttributes<ContactMessage>,
  InferCreationAttributes<ContactMessage>
> {
  declare id: CreationOptional<string>;
  declare authorName: string;
  declare authorEmail: string;
  declare content: string;
}

ContactMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'contactmessages',
    timestamps: true, // Inclut createdAt et updatedAt
  }
);

export default ContactMessage;


