import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';

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
  @Default(() => createId())
  @Column(DataType.STRING)
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public token!: string;
}

export default BlackListedToken;
