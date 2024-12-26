import { body } from 'express-validator';

export const createPropertyValidator = [
  body('title')
    .isString()
    .withMessage('Le titre doit être une chaîne de caractères non vide.')
    .isLength({ min: 1 })
    .withMessage('Le titre est requis.'),

  body('property_type')
    .isIn(['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'])
    .withMessage("Le type de propriété doit être l'un des suivants : land, villa, banquet_hall, building, apartment, duplex."),

  body('status')
    .isString()
    .withMessage('Le statut doit être une chaîne de caractères.')
    .isIn(['for_sale', 'for_rent', 'leased', 'sold'])
    .withMessage("Le statut doit être l'un des suivants : for_sale, for_rent, leased, sold."),

  body('city')
    .isIn(["Bafoussam",
      "Bamenda",
      "Bertoua",
      "Buéa",
      "Douala",
      "Ebolowa",
      "Garoua",
      "Maroua",
      "Ngaoundéré",
      "Yaoundé"])
    .withMessage("Le lieu de la propriété doit être l'une des villes du Cameroun")
    .notEmpty()
    .withMessage('La ville où se trouve la propriété doit être specifiée'),

  body('hood')
    .isString()
    .withMessage('Vous devez précisez le quartier où réside votre propriété')
    .notEmpty()
    .withMessage('Le quartier où se trouve la propriété doit être specifiée'),

  body('furnished')
    .if(body('property_type').not().equals('land'))
    .isBoolean()
    .withMessage('Le champ "furnished" doit préciser si oui ou non la propriété est meublée'),

  body('price')
    .isNumeric()
    .withMessage('Le prix doit être un nombre.')
    .notEmpty()
    .withMessage('Le prix est requis'),

  body('priceFrequency')
    .if(body('status').equals('for_rent'))
    .isString()
    .withMessage('La fréquence de prix doit être une chaîne de caractères.')
    .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
    .withMessage("La fréquence de prix doit être l'une des suivantes : hourly, daily, weekly, monthly, yearly.")
    .notEmpty()
    .withMessage('La fréquence de prix est requise pour les propriétés à louer.'),

  body('area')
    .optional({checkFalsy:true})
    .isNumeric()
    .withMessage('La superficie doit être un nombre.'),

  body('description')
    .optional({checkFalsy:true})
    .isString()
    .withMessage('La description doit être une chaîne de caractères.'),

  body('rooms')
    .if(body('property_type').not().equals('land'))
    .isObject()
    .withMessage('Les détails des pièces doivent être un objet pour les propriétés qui ne sont pas des terrains.')
    .custom((value, { req }) => {
      if (req.body.property_type !== 'land') {
        if (!value || typeof value !== 'object') {
          throw new Error("Les informations sur les pièces sont requises pour les propriétés qui ne sont pas des terrains.");
        }
        const { bedrooms, livingRooms, kitchens, bathrooms } = value;
        if (typeof bedrooms !== 'number' || !bedrooms) {
          throw new Error('Vous devez préciser le nombre de chambres');
        }
        if (typeof livingRooms !== 'number' || !livingRooms) {
          throw new Error('Vous devez préciser le nombre de salons');
        }
        if (typeof kitchens !== 'number' || !kitchens) {
          throw new Error('Vous devez préciser le nombre de cuisines');
        }
        if (typeof bathrooms !== 'number' || !bathrooms) {
          throw new Error('Vous devez préciser le nombre de salles de bain');
        }
      }
      return true;
    }),

  body('images')
    .isArray({ min: 4, max:10 })
    .withMessage('Au moins quatres images sont requises.')
    .custom((images) => {
      if (!images.every((img:string) => typeof img === 'string')) {
        throw new Error('Chaque image doit être une chaîne de caractères.');
      }
      return true;
    }),
];
