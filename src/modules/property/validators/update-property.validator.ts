import { body, checkSchema } from 'express-validator';

// Middleware de validation pour la mise à jour des propriétés
export const updatePropertyValidator = [
  body('title')
    .optional({ checkFalsy:true })
    .isString()
    .withMessage('Le titre doit être une chaîne de caractères non vide.')
    .isLength({ min: 1 })
    .withMessage('Le titre est requis.'),
  
  body('property_type')
    .optional({ checkFalsy:true })
    .isIn(['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'])
    .withMessage("Le type de propriété doit être l'un des suivants : land, villa, banquet_hall, building, apartment, duplex."),
  
  body('status')
    .optional({ checkFalsy:true })
    .isIn(['for_sale', 'for_rent', 'leased', 'sold'])
    .withMessage("Le statut doit être l'un des suivants : for_sale, for_rent, leased, sold."),
  
    body('city')
    .optional({ checkFalsy:true })
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
    .withMessage("Le lieu de la propriété doit être l'une des villes du Cameroun"),

  body('hood')
    .optional({ checkFalsy:true })
    .isString()
    .withMessage('Vous devez précisez le quartier où réside votre propriété'),
  
  body('furnished')
    .optional({ checkFalsy:true })
    .isBoolean()
    .withMessage('Le champ "furnished" doit être de type booléen.'),
  
  body('price')
    .optional({ checkFalsy:true })
    .isNumeric()
    .withMessage('Le prix doit être un nombre.')
    .notEmpty()
    .withMessage('Le prix est requis.'),
  
  body('priceFrequency')
    .optional({ checkFalsy:true })
    .isIn(['hourly', 'daily', 'weekly', 'monthly', 'yearly'])
    .withMessage("La fréquence de prix doit être l'une des suivantes : hourly, daily, weekly, monthly, yearly.")
    .custom((value, { req }) => {
      if (req.body.status === 'for_rent' && !value) {
        throw new Error('La fréquence de prix est requise pour les propriétés à louer.');
      }
      return true;
    }),
  
  body('sellerId')
    .optional({ checkFalsy:true })
    .isString()
    .withMessage("L'identifiant du vendeur doit être une chaîne de caractères."),
  
  body('area')
    .optional({ checkFalsy:true })
    .isNumeric()
    .withMessage('La superficie doit être un nombre.')
    .notEmpty()
    .withMessage('La superficie est requise.'),
  
  body('description')
    .optional({ checkFalsy:true })
    .isString()
    .withMessage('La description doit être une chaîne de caractères.'),
  
  body('rooms')
    .optional({ checkFalsy:true })
    .isObject()
    .withMessage('Les détails des pièces doivent être un objet.')
    .custom((rooms, { req }) => {
      if (req.body.property_type !== 'land' && !rooms) {
        throw new Error('Les détails des pièces sont requis pour les propriétés qui ne sont pas des terrains.');
      }
      return true;
    }),
  
  body('images')
    .isArray({ min: 4, max:10 })
    .withMessage('Au moins quatres images sont requises.')
    .custom((images) => {
      if (!images.every((img: string) => typeof img === 'string')) {
        throw new Error('Chaque image doit être une chaîne de caractères.');
      }
      return true;
    }),

  body('likedBy')
    .optional({ checkFalsy:true })
    .isArray()
    .custom((uids) => {
      if (!uids.every((id: string) => typeof id === 'string')) {
        throw new Error('Chaque id doit être une chaîne de caractères.');
      }
      return true;
    }),

  body('savedBy')
    .optional({ checkFalsy:true })
    .isArray()
    .custom((uids) => {
      if (!uids.every((id: string) => typeof id === 'string')) {
        throw new Error('Chaque id doit être une chaîne de caractères.');
      }
      return true;
    }),
];
