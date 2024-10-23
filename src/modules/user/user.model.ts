import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import { Optional } from 'sequelize';
import AgencyUser from '../agencyuser/agencyuser.model';
import Property from '../property/property.model';
import Comment from '../comment/comment.model';
import Review from '../review/review.model';

// Définition des interfaces
export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'both' | 'agent' | 'agency_admin' | 'agency_owner' | 'admin';
  profilePic?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginDate?: Date;
  lastSessionDate?: Date;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'lastLoginDate' | 'lastSessionDate'> {}

// Définition du modèle User avec sequelize-typescript
@Table({
  tableName: 'users',
  timestamps: false,
})
class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
  @PrimaryKey
  @Default(() => createId())
  @Column(DataType.STRING)
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password!: string;

  @Column({
    type: DataType.ENUM('buyer', 'seller', 'both', 'agent', 'agency_owner','agency_admin', 'admin'),
    allowNull: false,
    defaultValue: 'both',
  })
  public role!: 'buyer' | 'seller' | 'both' | 'agent' | 'agency_owner' | 'agency_admin' | 'admin';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePic?: string;

  @Default(() => new Date())
  @Column({
    type: DataType.DATE,
  })
  public createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public updatedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public lastLoginDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public lastSessionDate!: Date;

  @HasMany(() => AgencyUser, 'userId')
  agencyUsers!: AgencyUser[];

  @HasMany(() => Property, 'sellerId')
  properties!: Property[];

  @HasMany(() => Comment, 'authorId')
  comments!: Comment[];

  @HasMany(() => Review, 'userId')
  public reviews!: Review;
}

export default User;

