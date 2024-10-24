import { body } from "express-validator";

export const registerUserValidator = [
    body('firstName')
      .isString()
      .withMessage('Le prénom doit être une chaîne de caractères non vide.')
      .isLength({ min: 1 })
      .withMessage('Le prénom est requis.'),
    
    body('lastName')
      .isString()
      .withMessage('Le nom doit être une chaîne de caractères non vide.')
      .isLength({ min: 1 })
      .withMessage('Le nom est requis.'),
    
    body('email')
      .isEmail()
      .withMessage('L\'adresse email est invalide.')
      .isLength({ min: 1 })
      .withMessage('L\'adresse email est requise.'),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('Le mot de passe doit contenir au moins 6 caractères.')
      .matches(/^(?=.*[A-Z]{2,})(?=.*\d)/)
      .withMessage('Le mot de passe doit contenir au moins 1 chiffre et 2 lettres majuscules.'),
  ];
  

