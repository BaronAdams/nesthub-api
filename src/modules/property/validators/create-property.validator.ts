import { body } from 'express-validator';

export const createPropertyValidator = [
  body('title')
    .isString()
    .withMessage('Le titre doit être une chaîne de caractères non vide.')
    .isLength({ min: 1 })
    .withMessage('Le titre est requis.'),

  body('property_type')
    .isIn(['Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison'])
    .withMessage("Le type de propriété doit être l'un des suivants : 'Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison'"),

  body('status')
    .isString()
    .withMessage('Le statut doit être une chaîne de caractères.')
    .isIn(['A vendre', 'A louer', 'Indisponible', 'Déja pris'])
    .withMessage("Le statut doit être l'un des suivants : 'A vendre', 'A louer', 'Indisponible', 'Déja pris'"),

  body('city')
    .isIn(["Bafoussam", "Bamenda", "Bertoua", "Buéa", "Douala", "Ebolowa", "Garoua", "Maroua", "Ngaoundéré", "Yaoundé"])
    .withMessage("Le lieu de la propriété doit être l'une des villes du Cameroun")
    .notEmpty()
    .withMessage('La ville où se trouve la propriété doit être specifiée'),

  body('hood')
    .isString()
    .withMessage('Vous devez précisez le quartier où réside votre propriété')
    .notEmpty()
    .withMessage('Le quartier où se trouve la propriété doit être specifiée'),

  body('furnished')
    .if(body('property_type').not().equals('Terrain'))
    .isBoolean()
    .withMessage('Le champ "furnished" doit préciser si oui ou non la propriété est meublée'),

  body('price')
    .isNumeric()
    .withMessage('Le prix doit être un nombre')
    .notEmpty()
    .withMessage('Le prix est requis'),

  body("priceFrequency")
    .if(body("status").equals("A louer")) // Vérifie que le champ existe uniquement si le statut est "A louer"
    .notEmpty()
    .withMessage("Le champ 'priceFrequency' est obligatoire pour les propriétés 'A louer'.")
    .bail() // Arrête les validations suivantes si cette condition échoue
    .custom((value) => {
      const allowedKeys = ["jours", "semaines", "mois", "années"];
      const keys = Object.keys(value);

      // Vérifie qu'il y a exactement une clé
      if (keys.length !== 1) {
        throw new Error(
          "priceFrequency doit contenir exactement une propriété parmi: 'jours', 'semaines', 'mois', ou 'années'."
        );
      }

      // Vérifie que la clé est valide
      const key = keys[0];
      if (!allowedKeys.includes(key)) {
        throw new Error(
          `La propriété '${key}' n'est pas valide. Utilisez uniquement: 'jours', 'semaines', 'mois', ou 'années'.`
        );
      }

      // Vérifie que la valeur associée est un entier positif
      const valueOfKey = value[key];
      if (!Number.isInteger(valueOfKey) || valueOfKey <= 0) {
        throw new Error(
          `La valeur de '${key}' doit être un entier positif.`
        );
      }

      return true;
    })
    .withMessage("Le champ 'priceFrequency' doit respecter les contraintes définies."),

  body('area')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('La superficie doit être un nombre.'),

  body('description')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('La description doit être une chaîne de caractères.'),

  body('rooms')
    .if(body('property_type').not().equals('Terrain'))
    .isObject()
    .withMessage('Les détails des pièces doivent être un objet pour les propriétés qui ne sont pas des terrains.')
    .custom((value, { req }) => {
      if (req.body.property_type !== 'Terrain') {
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
    .isArray({ min: 4, max: 10 })
    .withMessage('Au moins quatres images sont requises.')
    .custom((images) => {
      if (!images.every((img: string) => typeof img === 'string')) {
        throw new Error('Chaque image doit être une chaîne de caractères.');
      }
      return true;
    }),
];
