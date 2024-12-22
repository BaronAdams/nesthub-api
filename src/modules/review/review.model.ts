import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey, BelongsTo, IsUUID } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import { Optional } from 'sequelize';
import User from '../user/user.model'; // Assurez-vous d'importer le modèle `User`

// Interfaces pour les attributs et la création
export interface IReviewAttributes {
  id: string;
  userId: string;
  stars: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviewCreationAttributes extends Optional<IReviewAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Modèle `Review` avec les relations et décorateurs de sequelize-typescript
@Table({
  tableName: 'reviews',
  timestamps: true, // Inclut `createdAt` et `updatedAt`
})
class Review extends Model<IReviewAttributes, IReviewCreationAttributes> implements IReviewAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type:DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  public id!: string;

  @ForeignKey(() => User) // Associe `userId` à la clé primaire de `User`
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public userId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // Note minimale 1
      max: 5, // Note maximale 5
    },
  })
  public stars!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public comment!: string;

  // Relation `belongsTo` vers le modèle `User`
  @BelongsTo(() => User, 'userId')
  public user!: User;
}

export default Review;
