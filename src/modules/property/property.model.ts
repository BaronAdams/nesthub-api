import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Sequelize,
  Op,
  NonAttribute
} from 'sequelize';
import User from '../user/user.model';
import PropertyReview from '../propertyreview/propertyreview.model';

class Property extends Model<
  InferAttributes<Property,{ omit: 'reviews'}>,
  InferCreationAttributes<Property,{ omit: 'reviews'}>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare property_type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
  declare status: 'for_sale' | 'for_rent' | 'leased' | 'sold';
  declare city: string;
  declare hood: string;
  declare furnished: boolean | null;
  declare price: number;
  declare priceFrequency: CreationOptional<'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'>;
  declare sellerId: ForeignKey<User['id']>;
  declare area: number | null;
  declare description: string | null;
  declare stars?: number;
  declare rooms: {
    bedrooms: number;
    livingRooms: number;
    kitchens: number;
    bathrooms: number;
  } | null;
  declare images: string[];
  declare likedBy: CreationOptional<string[]>;
  declare savedBy: CreationOptional<string[]>;

  //Associations
  declare reviews: NonAttribute<PropertyReview[]>;

  // Initialisation du modèle
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        property_type: {
          type: DataTypes.ENUM('land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'),
          allowNull: false,
        },

        status: {
          type: DataTypes.ENUM('for_sale', 'for_rent', 'leased', 'sold'),
          allowNull: false,
        },

        city: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            args: [["Bafoussam", "Bamenda", "Bertoua", "Buéa", "Douala", "Ebolowa", "Garoua", "Maroua", "Ngaoundéré", "Yaoundé"]],
            msg: "Votre propriété doit être logée dans l'une des villes du Cameroun"
          }
        },

        hood: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        furnished: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          validate: {
            isValidFurnished(value: boolean | null) {
              if (this.type === 'land' && value) {
                throw new Error("Ce ne sont que des propriétés qui ne sont pas des terrains qui peuvent être meublées");
              }
              // @ts-ignore
              if (this.type !== 'land' && !value) {
                throw new Error("Vous devez spécifier si oui ou non les propriétés sont meublées");
              }
            }
          }
        },

        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },

        priceFrequency: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isIn: {
              args: [['hourly', 'daily', 'weekly', 'monthly', 'yearly']],
              msg: "Vous devez préciser une fréquence de prix soit par heure, soit journalière, soit par semaine, soit par mois, soit par an"
            },
            isValidPriceFrequency(value: string) {
              if (this.status === 'for_sale' && value) {
                throw new Error("La fréquence de prix n'est possible que pour les propriétés à louer");
              }
            }
          }
        },

        sellerId: {
          type: DataTypes.UUID,
          allowNull: false,
          validate: {
            isUUID: 4,
            async isSeller(value: string) {
              if (value) {
                const user = await User.findOne({ where: { id: value, role: { [Op.in]: ["seller", "both"] } } });
                if (!user) {
                  throw Error("L'utilisateur n'est pas authorisé à vendre");
                }
              }
            }
          }
        },

        area: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },

        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        stars: {
          type: DataTypes.FLOAT,
          get(this: Property){
            if(!this.reviews || this.reviews.length === 0){
              return 0
            }
            let totalStars = this.reviews.reduce((sum,review)=> sum + review.stars, 0)
            return totalStars / this.reviews.length
          }
        },

        rooms: {
          type: DataTypes.JSONB,
          allowNull: true,
          validate: {
            isRoomsRequired(value: any) {
              if (this.type !== "land" && !value) {
                throw new Error("La précision des pièces est obligatoire");
              }

              if (this.type == "land" && value) {
                throw new Error("La précision des pièces ne sont pas possible pour des terrains");
              }
            }
          }
        },

        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },

        likedBy: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          defaultValue: [],
        },

        savedBy: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          defaultValue: [],
        }
      },
      {
        sequelize,
        tableName: 'properties',
        timestamps: true, // Inclut createdAt et updatedAt
      }
    );
  }

  // Définition des associations
  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
    this.hasMany(models.PropertyReview, { 
      foreignKey: 'propertyId', 
      as: 'reviews' 
    });
  }
}

export default Property;


