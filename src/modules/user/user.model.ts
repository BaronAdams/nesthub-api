import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany, IsUUID } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import AgencyUser from '../agencyuser/agencyuser.model';
import Property from '../property/property.model';
import Comment from '../comment/comment.model';
import Review from '../review/review.model';
import { generateColor } from '../../common/utils/helper';

type LangLevel = "Débutant" | "Courant" | "Expert";
type Preferences = {
  types: string[],
  minBudget: number,
  maxBudget: number
}

// Définition des interfaces
export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  languages:{
    french : LangLevel,
    english : LangLevel,
  };
  location: string;
  birthday: Date;
  color?:string;
  role: 'buyer' | 'seller' | 'both' | 'agent' | 'agency_admin' | 'agency_owner' | 'admin';
  isOnline?: boolean;
  lastSeen?: Date;
  profilePic?: string;
  preferences?: Preferences;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginDate?: Date;
  lastSessionDate?: Date;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id' | 'birthday' | 'languages' | 'createdAt' | 'updatedAt' | 'lastLoginDate' | 'lastSessionDate'> {}
// Définition du modèle User avec sequelize-typescript
@Table({
  tableName: 'users',
  timestamps: false,
})
class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
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
    type: DataType.STRING,
    allowNull: false,
  })
  public phone!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  public languages!:{
    french : "Débutant" | "Courant" | "Expert",
    english : "Débutant" | "Courant" | "Expert",
  };

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public location!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public birthday!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue : generateColor()
  })
  public color!: string;

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
  public profilePic?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public lastSeen!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  public isOnline!: boolean;

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

