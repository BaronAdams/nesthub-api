import { Table, Column, Model, DataType, PrimaryKey, IsEmail, Unique, HasMany, IsUUID } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Post from '../post/post.model';
  
// Interface de type pour Admin
export interface IAdminAttributes {
    id: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
  
export interface IAdminCreationAttributes extends Optional<IAdminAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  
// Définition du modèle Admin avec sequelize-typescript
@Table({
    tableName: 'admins',
    timestamps: true,  // Gère automatiquement les champs createdAt et updatedAt
})
class Admin extends Model<IAdminAttributes, IAdminCreationAttributes> implements IAdminAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  public id!: string;
  
  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email!: string;

  @HasMany(() => Post, 'adminId')
  public posts!: Post[];
}
  
export default Admin;
  