import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
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
  @Default(() => createId()) // Génération de l'ID par défaut
  @Column(DataType.STRING)
  public id!: string;

  @ForeignKey(() => User) // Associe `userId` à la clé primaire de `User`
  @Column({
    type: DataType.STRING,
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

  // Les champs `createdAt` et `updatedAt` sont inclus automatiquement avec `timestamps: true`
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Relation `belongsTo` vers le modèle `User`
  @BelongsTo(() => User, 'userId')
  public user!: User;
}

export default Review;
