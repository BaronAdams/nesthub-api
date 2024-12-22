import { Table, Model, Column, DataType, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { Optional } from 'sequelize';

// Définition des interfaces pour les attributs et la création
export interface IContactMessageAttributes {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContactMessageCreationAttributes extends Optional<IContactMessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Modèle `ContactMessage` avec les décorateurs de sequelize-typescript
@Table({
  tableName: 'contactmessages',
  timestamps: true, // Pour inclure `createdAt` et `updatedAt`
})
class ContactMessage extends Model<IContactMessageAttributes, IContactMessageCreationAttributes> implements IContactMessageAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type:DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public authorName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public authorEmail!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public content!: string;

  // Les propriétés `createdAt` et `updatedAt` sont incluses par défaut avec `timestamps: true`
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default ContactMessage;

