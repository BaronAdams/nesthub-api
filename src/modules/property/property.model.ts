import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Sequelize,
  Op,
  NonAttribute,
  HasManyCountAssociationsMixin
} from 'sequelize';
import User from '../user/user.model';
import PropertyReview from '../propertyreview/propertyreview.model';

type PriceFrequency = 
  | { jours: number; mois?:never; semaines?:never; années?:never } 
  |  { jours?: never; mois:number; semaines?:never; années?:never } 
  |  { jours?: never; mois?:never; semaines:number; années?:never }
  |  { jours?: never; mois?:never; semaines?:never; années:number };

class Property extends Model<
  InferAttributes<Property,{ omit: 'seller' | 'reviews'}>,
  InferCreationAttributes<Property,{ omit: 'seller' | 'reviews'}>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare property_type: 'Terrain' | 'Villa' | 'Salle de fêtes' | 'Immeuble' | 'Appartement' | 'Duplex' | 'Studio' | 'Chambre d\'hôtel' | 'Entrepôt' | 'Maison de vacances' | 'Bureau' | 'Magasin' | 'Espace de vente' | 'Contenaire' | 'Chambre étudiant' | 'Maison';
  declare status: 'A vendre' | 'A louer' | 'Indisponible' | 'Déja pris';
  declare city: string;
  declare hood: string;
  declare furnished: boolean | null;
  declare price: number;
  declare priceFrequency: CreationOptional<PriceFrequency>;
  // {
  //   jours: number,
  //   semaines: number,
  //   mois: number,
  //   années: number
  // }>;
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
  declare seller: NonAttribute<User>;
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
          type: DataTypes.STRING,
          allowNull: false,
        },

        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        hood: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        furnished: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },

        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },

        priceFrequency: {
          type: DataTypes.JSONB,
          allowNull: true,
        },

        sellerId: {
          type: DataTypes.UUID,
          allowNull: false
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
            return Math.round(10 * totalStars / this.reviews.length) / 10
          }
        },

        rooms: {
          type: DataTypes.JSONB,
          allowNull: true
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


