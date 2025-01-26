import { body } from "express-validator";

export const registerManyUsersValidator = [
    body('*.firstName')
      .isString()
      .withMessage('Le prénom doit être une chaîne de caractères non vide.')
      .isLength({ min: 1 })
      .withMessage('Le prénom est requis.'),
    
    body('*.lastName')
      .isString()
      .withMessage('Le nom doit être une chaîne de caractères non vide.')
      .isLength({ min: 1 })
      .withMessage('Le nom est requis.'),
    
    body('*.email')
      .isEmail()
      .withMessage('L\'adresse email est invalide.')
      .isLength({ min: 1 })
      .withMessage('L\'adresse email est requise.'),
    
    body('*.password')
    .matches(/^(?=.*[A-Z]{1,})(?=.*\d)/)
    .withMessage('Le mot de passe doit contenir au moins 1 chiffre et 1 lettre majuscule.')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
    
    body('*.location')
    .isString()
    .withMessage('La localisation entrée doit être une chaîne de caractères.')
    .isIn(['Yaoundé', 'Douala', 'Bafoussam', 'Buéa', 'Bamenda', 'Ebolowa','Bertoua','Ngaoundéré','Garoua','Maroua'])
    .withMessage("Vous devez être localisé dans l'une des villes du Cameroun"),

    body('*.phone')
    .isNumeric()
    .withMessage("Le numéro de telephone doit contenir uniquement des chiffres")
    .isLength({ min: 9, max:9 })
    .withMessage('Le numéro de telephone doit avoir exactement 9 chiffres')
  ];
  
