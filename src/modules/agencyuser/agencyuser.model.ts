import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  HasMany,
  IsUUID,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import User from '../user/user.model';
import Property from '../property/property.model';
import Agency from '../agency/agency.model';

// Définir les attributs du modèle
interface IAgencyUserAttributes {
  id: string;
  userId: string;
  agencyId: string;
  role: 'admin' | 'agent' | 'owner'; // Rôle de l'utilisateur au sein de l'agence
  permissions: {
    canCreateProperty: boolean;
    canUpdateProperty: boolean;
    canDeleteProperty: boolean;
  };
  status: 'active' | 'inactive' | 'pending'; // Statut de l'utilisateur dans l'agence
  createdAt?: Date;
  updatedAt?: Date;
}

// Définir les attributs pour la création
interface IAgencyUserCreationAttributes extends Optional<IAgencyUserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

// Initialisation du modèle
@Table({
  tableName: 'agency_users',
  timestamps: true,
})
class AgencyUser extends Model<IAgencyUserAttributes, IAgencyUserCreationAttributes> implements IAgencyUserAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type:DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  public id!: string;

  @ForeignKey(() => User)
  @IsUUID(4)
  @Column(DataType.UUID)
  public userId!: string;

  @ForeignKey(() => Agency)
  @IsUUID(4)
  @Column(DataType.UUID)
  public agencyId!: string;

  @Column({
    type: DataType.ENUM('admin', 'agent','owner'),
    allowNull: false,
  })
  public role!: 'admin' | 'agent' | 'owner';

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {
      canCreateProperty: false,
      canUpdateProperty: false,
      canDeleteProperty: false,
    },
  })
  public permissions!: {
    canCreateProperty: boolean;
    canUpdateProperty: boolean;
    canDeleteProperty: boolean;
  };

  @Column({
    type: DataType.ENUM('active', 'inactive', 'pending'),
    allowNull: false,
    defaultValue: 'pending',
  })
  public status!: 'active' | 'inactive' | 'pending';
  // Définition des relations
  @BelongsTo(() => User, 'userId')
  user!: User;

  @BelongsTo(() => Agency, 'agencyId')
  agency!: Agency;

  @HasMany(()=> Property,'agentId')
  properties!: Property[]
}

export default AgencyUser;
