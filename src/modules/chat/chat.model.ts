import { Table, Column, PrimaryKey, Default, IsUUID, DataType, AllowNull, Model } from "sequelize-typescript";
import { Optional } from "sequelize";

// Interface de type pour Admin
export interface IChatAttributes {
  id: string;
  title?: string;
  participants?: string[];
  isGroup: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChatCreationAttributes extends Optional<IChatAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({ tableName: "chats", timestamps: true })
class Chat extends Model<IChatAttributes, IChatCreationAttributes> implements IChatAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @Column({
    type:DataType.STRING
  })
  title?: string; // Optionnel si ce n'est pas un groupe

  @Column({
    type:DataType.ARRAY(DataType.UUID), 
    allowNull: false
  }) // IDs des participants
  participants!: string[];


  @Default(false) // Par défaut, ce n'est pas un groupe
  @AllowNull(false)
  @Column({
    type:DataType.BOOLEAN,
  })
  isGroup!: boolean;
}

export default Chat
