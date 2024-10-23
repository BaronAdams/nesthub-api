import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    CreatedAt,
    UpdatedAt,
    HasMany,
  } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import { Optional } from 'sequelize';
import Agency from '../agency/agency.model';
  
// Interfaces de type pour Subscription
export interface ISubscriptionAttributes {
    id: string;
    name: string;
    price: number;
    agentLimit: number;
    propertyLimit: number;
    createdAt?: Date;
    updatedAt?: Date;
}
  
  export interface ISubscriptionCreationAttributes extends Optional<ISubscriptionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  
  // Définition du modèle Subscription avec sequelize-typescript
  @Table({
    tableName: 'subscriptions',
    timestamps: true,  // Gère automatiquement les champs createdAt et updatedAt
  })
  class Subscription extends Model<ISubscriptionAttributes, ISubscriptionCreationAttributes> implements ISubscriptionAttributes {
    @PrimaryKey
    @Default(() => createId())
    @Column(DataType.STRING)
    id!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;
  
    @Column({
      type: DataType.FLOAT,
      allowNull: false,
    })
    price!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    agentLimit!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    propertyLimit!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    @HasMany(() => Agency, 'subscriptionId')
    agencies!: Agency[];
  }
  
export default Subscription;
  
