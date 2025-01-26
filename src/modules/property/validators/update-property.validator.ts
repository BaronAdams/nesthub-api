import { body } from 'express-validator';

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
    .isIn(['Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison'])
    .withMessage("Le type de propriété doit être l'un des suivants : 'Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison'"),
  
  body('status')
    .optional({ checkFalsy:true })
    .isIn(['A vendre', 'A louer', 'Indisponible', 'Déja pris'])
    .withMessage("Le statut doit être l'un des suivants : 'A vendre', 'A louer', 'Indisponible', 'Déja pris'"),
  
    body('city')
    .optional({ checkFalsy:true })
    .isIn(["Bafoussam", "Bamenda", "Bertoua", "Buéa", "Douala", "Ebolowa", "Garoua", "Maroua", "Ngaoundéré", "Yaoundé"])
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
  
  // body('sellerId')
  //   .optional({ checkFalsy:true })
  //   .isString()
  //   .withMessage("L'identifiant du vendeur doit être une chaîne de caractères."),
  
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
      if (req.body.property_type !== 'Terrain' && !rooms) {
        throw new Error('Les détails des pièces sont requis pour les propriétés qui ne sont pas des terrains.');
      }
      return true;
    }),
  
  body('images')
  .optional({ checkFalsy:true })
    .isArray({ min: 4, max:10 })
    .withMessage('Au moins quatres images sont requises.')
    .custom((images) => {
      if (!images.every((img: string) => typeof img === 'string')) {
        throw new Error('Chaque image doit être une chaîne de caractères.');
      }
      return true;
    }),

  // body('likedBy')
  //   .optional({ checkFalsy:true })
  //   .isArray()
  //   .custom((uids) => {
  //     if (!uids.every((id: string) => typeof id === 'string')) {
  //       throw new Error('Chaque id doit être une chaîne de caractères.');
  //     }
  //     return true;
  //   }),

  // body('savedBy')
  //   .optional({ checkFalsy:true })
  //   .isArray()
  //   .custom((uids) => {
  //     if (!uids.every((id: string) => typeof id === 'string')) {
  //       throw new Error('Chaque id doit être une chaîne de caractères.');
  //     }
  //     return true;
  //   }),
];
