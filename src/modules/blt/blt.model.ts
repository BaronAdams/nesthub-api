import { Table, Column, Model, DataType, PrimaryKey, IsUUID } from 'sequelize-typescript';

export interface IBlackListedTokenAttributes {
  id: string;
  token: string;
}

export interface IBlackListedTokenCreationAttributes extends Partial<IBlackListedTokenAttributes> {}

@Table({
  tableName: 'blacklistedtokens',
  timestamps: false, // No timestamps are needed for this table.
})
class BlackListedToken extends Model<IBlackListedTokenAttributes, IBlackListedTokenCreationAttributes> implements IBlackListedTokenAttributes {
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
    unique: true,
  })
  public token!: string;
}

export default BlackListedToken;
