import { body } from 'express-validator';

export interface IPropertyAttributes {
    id: string;
    title: string;
    type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    status: 'for_sale' | 'for_rent';
    place: string;
    furnished?: boolean;
    price: number;
    priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly" ;
    sellerId?: string;
    agentId: string;
    agencyId: string;
    area: number;
    description?: string;
    rooms?:{
        bedrooms: number;
        livingRooms: number;
        kitchens: number;
        bathrooms: number
    };
    images: string[];
    likedBy?: string[];
    savedBy?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}


export const createPropertyValidator = [
  body('title')
    .isString()
    .withMessage('Le titre est requis et doit être une chaîne de caractères.')
    .notEmpty()
    .withMessage('Le titre ne peut pas être vide.'),

  body('type')
    .isIn(['land', 'villa', 'apartment', 'duplex', 'building', 'eventHall'])
    .withMessage('Le type de propriété doit être l’un des suivants : land, villa, apartment, duplex, building, eventHall.'),

  body('price')
    .notEmpty().withMessage("Vous devez fixer un prix pour votre propriété")
    .isFloat({ gt: 0 })
    .withMessage('Le prix est requis et doit être un nombre positif.'),

  body('status')
    .isIn(['for_sale', 'for_rent', 'leased' , 'sold'])
    .withMessage('Le statut de la propriété doit être forSale ou forRent.'),

  body('place')
    .notEmpty().withMessage("Vous devez préciser l'adresse de la propriété")
    .isString()
    .withMessage("L'adresse de la propriété doit être une chaine de caractères"),

  body('furnished')
    .optional({ checkFalsy: true })
    .isBoolean().withMessage("Vous devez dire si votre propriété est meublée ou pas ")
    .custom((value, { req }) => {
        if (req.body.type === 'land' && value) {
          throw new Error("Ce ne sont que des propriétés qui ne sont pas des terrains qui peuvent être meublées");
        }
        return true;
      }),

  body('priceFrequency')
    .optional({checkFalsy: true})  // Ce champ est optionnel
    .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
    .withMessage('La fréquence de prix doit être hourly, daily, weekly, monthly ou yearly.')
    .custom((value, { req }) => {
      if (req.body.status === 'for_sale' && value) {
        throw new Error("La fréquence de prix ne doit être définie que pour les propriétés à louer.");
      }
      return true;
    }),

  body('agencyId')
    .notEmpty().withMessage("Vous devez mettre l'ID de votre agence")
    .isString()
    .withMessage("L'ID de votre agence doit être une chaîne de caractères."),

  body('agentId')
    .notEmpty().withMessage("Vous devez mettre l'ID de l'agent chargé de vendre la propriété")
    .isString()
    .withMessage("L'ID de l'agent doit être une chaîne de caractères."),

  body('sellerId')
    .optional({checkFalsy: true})
    .isString()
    .withMessage("L'ID de l'agence est requis et doit être une chaîne de caractères."),

  body('area')
    .optional({checkFalsy: true})
    .isFloat({ gt: 0 })
    .withMessage('La superficie est requise et doit être un nombre positif.'),

  body('description')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('La description doit être une chaîne de caractères.'),

  body('rooms')
    .optional({checkFalsy: true})
    .custom((value, { req }) => {
      if (req.body.type !== 'land') {
        if (!value || typeof value !== 'object') {
          throw new Error("Les informations sur les pièces sont requises pour les propriétés qui ne sont pas des terrains.");
        }
        const { bedrooms, livingRooms, kitchens, bathrooms } = value;
        if (typeof bedrooms !== 'number' || bedrooms < 0) {
          throw new Error('Le nombre de chambres doit être un nombre non négatif.');
        }
        if (typeof livingRooms !== 'number' || livingRooms < 0) {
          throw new Error('Le nombre de salons doit être un nombre non négatif.');
        }
        if (typeof kitchens !== 'number' || kitchens < 0) {
          throw new Error('Le nombre de cuisines doit être un nombre non négatif.');
        }
        if (typeof bathrooms !== 'number' || bathrooms < 0) {
          throw new Error('Le nombre de salles de bain doit être un nombre non négatif.');
        }
      }
      return true;
    }),

    body('images')
    .isArray({min:4, max:10})
    .withMessage("Vous devez charger au moins 4 photos et au plus 10"),

    body('likedBy')
    .optional({checkFalsy: true})
    .isArray()
    .withMessage("Vous devez charger au moins 4 photos et au plus 10"),

    body('savedBy')
    .optional({checkFalsy: true})
    .isArray({min:4, max:10})
    .withMessage("Vous devez charger au moins 4 photos et au plus 10")
];


export const updatePropertyValidator = [
    body('title')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage('Le titre est requis et doit être une chaîne de caractères.'),

    body('type')
        .optional({ checkFalsy: true })
        .isIn(['land', 'villa', 'apartment', 'duplex', 'building', 'eventHall'])
        .withMessage('Le type de propriété doit être l’un des suivants : land, villa, apartment, duplex, building, eventHall.'),

    body('price')
        .optional({ checkFalsy: true })
        .isFloat({ gt: 0 })
        .withMessage('Le prix est requis et doit être un nombre positif.'),

    body('status')
        .optional({ checkFalsy: true })
        .isIn(['for_sale', 'for_rent', 'leased' , 'sold'])
        .withMessage('Le statut de la propriété doit être forSale ou forRent.'),

    body('place')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("L'adresse de la propriété doit être une chaine de caractères"),
    
    body('furnished')
        .optional({ checkFalsy: true })
        .isBoolean().withMessage("Vous devez dire si votre propriété est meublée ou pas ")
        .custom((value, { req }) => {
            if (req.body.type === 'land' && value) {
              throw new Error("Ce ne sont que des propriétés qui ne sont pas des terrains qui peuvent être meublées");
            }
            return true;
          }),    

    body('priceFrequency')
        .optional({checkFalsy: true})  // Ce champ est optionnel
        .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
        .withMessage('La fréquence de prix doit être hourly, daily, weekly, monthly ou yearly.')
        .custom((value, { req }) => {
        if (req.body.status === 'for_sale' && value) {
            throw new Error("La fréquence de prix ne doit être définie que pour les propriétés à louer.");
        }
        return true;
        }),

    body('agentId')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("L'ID de l'agent doit être une chaîne de caractères."),

    body('sellerId')
        .optional({checkFalsy: true})
        .isString()
        .withMessage("L'ID de l'agence est requis et doit être une chaîne de caractères."),

    body('area')
        .optional({checkFalsy: true})
        .isFloat({ gt: 0 })
        .withMessage('La superficie est requise et doit être un nombre positif.'),

    body('description')
        .optional({checkFalsy: true})
        .isString()
        .withMessage('La description doit être une chaîne de caractères.'),

    body('rooms')
        .optional({checkFalsy: true})
        .custom((value, { req }) => {
        if (req.body.type !== 'land') {
            if (!value || typeof value !== 'object') {
            throw new Error("Les informations sur les pièces sont requises pour les propriétés qui ne sont pas des terrains.");
            }
            const { bedrooms, livingRooms, kitchens, bathrooms } = value;
            if (typeof bedrooms !== 'number' || bedrooms < 0) {
            throw new Error('Le nombre de chambres doit être un nombre non négatif.');
            }
            if (typeof livingRooms !== 'number' || livingRooms < 0) {
            throw new Error('Le nombre de salons doit être un nombre non négatif.');
            }
            if (typeof kitchens !== 'number' || kitchens < 0) {
            throw new Error('Le nombre de cuisines doit être un nombre non négatif.');
            }
            if (typeof bathrooms !== 'number' || bathrooms < 0) {
            throw new Error('Le nombre de salles de bain doit être un nombre non négatif.');
            }
        }
        return true;
        }),

      body('images')
      .optional({checkFalsy: true})
      .isArray()
];