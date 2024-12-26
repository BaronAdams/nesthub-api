import { body } from "express-validator";

export const updatePropertyReviewValidator = [
    body('comment')
    .optional({ checkFalsy:true })
    .isLength({ min: 1 })
    .withMessage('Le commentaire du feedback doit avoir au moins 1 caractère')
    .isString()
    .withMessage('Votre commentaire du feedback être une chaine de caractères')
    .notEmpty()
    .withMessage("Le commentaire du feedback est obligatoire"),
      
    body('stars')
    .optional({ checkFalsy:true })
    .isFloat({ min:1, max:5 })
    .withMessage("1 étoile au moins, 5 étoiles au plus pour le feedback")
    .notEmpty()
    .withMessage("Le nombre d'étoiles du feedback est obligatoire"),
];
  