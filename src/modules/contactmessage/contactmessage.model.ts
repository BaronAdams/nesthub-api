import { DataTypes, Model, CreationOptional, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';

class ContactMessage extends Model<
  InferAttributes<ContactMessage>,
  InferCreationAttributes<ContactMessage>
> {
  declare id: CreationOptional<string>;
  declare authorName: string;
  declare authorEmail: string;
  declare content: string;

  // Méthode statique pour initialiser le modèle
  static initialize(sequelize: Sequelize) {
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
  }
}

export default ContactMessage;


