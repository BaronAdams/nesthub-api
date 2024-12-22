import { body } from "express-validator";

export const loginUserValidator = [
    body('email')
      .isEmail()
      .withMessage('L\'adresse email est invalide.')
      .notEmpty()
      .withMessage('L\'adresse email est requise.'),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('Le mot de passe doit contenir au moins 6 caractères.')
      .matches(/^(?=.*[A-Z]{1,})(?=.*\d)/)
      .withMessage('Le mot de passe doit contenir au moins 1 chiffre et 1 lettre majuscule.')
      .notEmpty()
      .withMessage('Le mot de passe est requis')
]