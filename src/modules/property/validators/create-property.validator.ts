import { body } from 'express-validator';

export const createPropertyValidator = [
  body('title')
    .isString()
    .withMessage('Le titre doit être une chaîne de caractères non vide.')
    .isLength({ min: 1 })
    .withMessage('Le titre est requis.'),

  body('type')
    .isString()
    .withMessage('Le type de propriété doit être une chaîne de caractères.')
    .isIn(['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'])
    .withMessage("Le type de propriété doit être l'un des suivants : land, villa, banquet_hall, building, apartment, duplex."),

  body('status')
    .isString()
    .withMessage('Le statut doit être une chaîne de caractères.')
    .isIn(['for_sale', 'for_rent', 'leased', 'sold'])
    .withMessage("Le statut doit être l'un des suivants : for_sale, for_rent, leased, sold."),

  body('place')
    .if(body('type').not().equals('land'))
    .isString()
    .withMessage('Le lieu doit être une chaîne de caractères lorsque le type de propriété n\'est pas un terrain.'),

  body('furnished')
    .if(body('type').not().equals('land'))
    .isBoolean()
    .withMessage('Le champ "furnished" doit être de type booléen lorsque le type de propriété n\'est pas un terrain.'),

  body('price')
    .isNumeric()
    .withMessage('Le prix doit être un nombre.')
    .notEmpty()
    .withMessage('Le prix est requis.'),

  body('priceFrequency')
    .if(body('status').equals('for_rent'))
    .isString()
    .withMessage('La fréquence de prix doit être une chaîne de caractères.')
    .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
    .withMessage("La fréquence de prix doit être l'une des suivantes : hourly, daily, weekly, monthly, yearly.")
    .notEmpty()
    .withMessage('La fréquence de prix est requise pour les propriétés à louer.'),

  body('sellerId')
    .optional({checkFalsy: true})
    .isString()
    .withMessage("L'identifiant du vendeur doit être une chaîne de caractères."),

  body('agentId')
    .isString()
    .withMessage("L'identifiant de l'agent est requis et doit être une chaîne de caractères.")
    .notEmpty()
    .withMessage("L'ID de l'agent chargé de vendre la propriété doit être specifié"),

  body('agencyId')
    .isString()
    .withMessage("L'identifiant de l'agence est requis et doit être une chaîne de caractères.")
    .notEmpty()
    .withMessage("L'ID de l'agence chargée de la propriété doit être specifié."),

  body('area')
    .isNumeric()
    .withMessage('La superficie doit être un nombre.')
    .notEmpty()
    .withMessage('La superficie est requise.'),

  body('description')
    .optional({checkFalsy:true})
    .isString()
    .withMessage('La description doit être une chaîne de caractères.'),

  body('rooms')
    .if(body('type').not().equals('land'))
    .isObject()
    .withMessage('Les détails des pièces doivent être un objet pour les propriétés qui ne sont pas des terrains.')
    .custom((rooms) => {
      if (typeof rooms !== 'object') {
        throw new Error('Les détails des pièces doivent être un objet.');
      }
      const { bedrooms, livingRooms, kitchens, bathrooms } = rooms;
      if (
        bedrooms !== undefined && typeof bedrooms !== 'number' ||
        livingRooms !== undefined && typeof livingRooms !== 'number' ||
        kitchens !== undefined && typeof kitchens !== 'number' ||
        bathrooms !== undefined && typeof bathrooms !== 'number'
      ) {
        throw new Error('Les détails des pièces doivent être des nombres.');
      }
      return true;
    }),

  body('images')
    .isArray({ min: 1 })
    .withMessage('Les images doivent être fournies sous forme de tableau avec au moins une image.')
    .custom((images) => {
      if (!images.every((img:string) => typeof img === 'string')) {
        throw new Error('Chaque image doit être une chaîne de caractères.');
      }
      return true;
    }),
];
