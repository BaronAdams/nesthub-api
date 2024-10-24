import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, ForeignKey, Validate, BelongsTo, Is, IsUUID } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import User from '../user/user.model';
import AgencyUser from '../agencyuser/agencyuser.model';
import { Op, Optional } from 'sequelize';
import Agency from '../agency/agency.model';
  
// Interface de type pour Property
export interface IPropertyAttributes {
    id: string;
    title: string;
    type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    status: 'for_sale' | 'for_rent' | 'leased' | 'sold';
    place: string;
    furnished?: boolean;
    price: number;
    priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly";
    sellerId?: string;
    agentId: string;
    agencyId: string;
    area: number;
    description?: string;
    rooms?: {
      bedrooms: number;
      livingRooms: number;
      kitchens: number;
      bathrooms: number;
    };
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
export interface IPropertyCreationAttributes extends Optional<IPropertyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  
@Table({
  tableName: 'properties',
  timestamps: true, // Gère automatiquement les champs createdAt et updatedAt
})
class Property extends Model<IPropertyAttributes, IPropertyCreationAttributes> implements IPropertyAttributes {
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
    })
    public title!: string;
  
    @Column({
      type: DataType.ENUM('land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'),
      allowNull: false,
    })
    public type!: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
  
    @Column({
      type: DataType.ENUM('for_sale', 'for_rent', 'leased', 'sold'),
      allowNull: false,
    })
    public status!: 'for_sale' | 'for_rent' | 'leased' | 'sold';
  
    @AllowNull
    @Column(DataType.STRING)
    public place!: string;

    @Is("isValidFurnished",(value: boolean) => {
      // @ts-ignore
      if (this.type === 'land' && value) {
        throw new Error("Ce ne sont que des propriétés qui ne sont pas des terrains qui peuvent être meublées");
      }
      // @ts-ignore
      if (this.type !== 'land' && !value) {
        throw new Error("Vous devez spécifier si oui ou non les propriétés sont meublées");
      }
    })
    @Column({
      type:DataType.BOOLEAN,
      allowNull: true
    })
    public furnished?: boolean;
  
    @Column({
      type: DataType.FLOAT,
      allowNull: false,
    })
    public price!: number;
  
    @AllowNull
    @Validate({
      isValidPriceFrequency(value: string) {
        if (this.status === 'for_sale' && value) {
          throw new Error("La fréquence de prix n'est possible que pour les propriétés à louer");
        }
      },
    })
    @Column({
      type: DataType.ENUM("hourly", "daily", "weekly", "monthly", "yearly"),
    })
    public priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  
    @ForeignKey(() => User)
    @AllowNull
    @Is("validateSellerId", async (sellerId: string | undefined) => {
      if(sellerId){
        const user = await User.findOne({ where: { id: sellerId, role: {[Op.in]: ["seller","both","agency_owner","agency_admin","admin"] } } });
            if (!user) {
                throw Error("L'utilisateur n'est pas authorisé à vendre", );
            }
            // @ts-ignore
            const isAmemberofAgency = await AgencyUser.findOne({ where:{ userId: sellerId, agencyId: this.agencyId as string }})
            if(isAmemberofAgency) throw Error("L'agent ne peut pas vendre une propriété à son agence", );
          }
        })
    @IsUUID(4)
    @Column(DataType.UUID)
    public sellerId?: string;
  
    @ForeignKey(() => AgencyUser)
    @IsUUID(4)
    @Is("isAnAgent", async (value: string) => {
      const agent = await AgencyUser.findOne({ where: { id: value, role: 'agent' } });
      if (!agent) {
        throw Error("L'agentId doit correspondre à un utilisateur ayant le rôle 'agent'.", );
      }
    })
    @Column({
      type:DataType.UUID,
      allowNull: false
    })  
    public agentId!: string;
  
    @ForeignKey(() => Agency)
    @IsUUID(4)
    @Column({
      type:DataType.UUID,
      allowNull: false
    })
    public agencyId!: string;
  
    @Column({
      type: DataType.FLOAT,
      allowNull: false,
    })
    public area!: number;
  
    @AllowNull
    @Column(DataType.STRING)
    public description?: string;
  
    @AllowNull
    @Is("isRoomsRequired",(value: any)=> {
      // @ts-ignore
      if (this.type !== "land" && !value) {
        throw new Error("La précision du nombre de pièces ne sont pas possible pour des terrains");
      }
    })
    @Column(DataType.JSONB)
    public rooms?: {
      bedrooms: number;
      livingRooms: number;
      kitchens: number;
      bathrooms: number;
    };
  
    @Column({
      type: DataType.ARRAY(DataType.STRING),
      allowNull: false,
    })
    public images!: string[];
  
    // Définition des relations
    @BelongsTo(() => User, 'sellerId')
    seller!: User;

    @BelongsTo(() => Agency, 'agencyId')
    agency!: Agency;

    @BelongsTo(() => AgencyUser, 'agentId')
    public agent!: AgencyUser;

}

  
export default Property;
  
