import { body } from "express-validator";

export const createPropertyReviewValidator = [   
    body('propertyId')
      .isUUID(4)
      .withMessage("Le format de l'ID de la propriété feedbacké n'est pas valide")
      .notEmpty()
      .withMessage("L'ID de la propriété feedbacké est obligatoire"),
    
    body('comment')
      .isLength({ min: 1 })
      .withMessage('Le commentaire du feedback doit avoir au moins 1 caractère')
      .isString()
      .withMessage('Votre commentaire du feedback être une chaine de caractères')
      .notEmpty()
      .withMessage("Le commentaire du feedback est obligatoire"),
      
    body('stars')
    .isFloat({ min:1, max:5 })
    .withMessage("1 étoile au moins, 5 étoiles au plus pour le feedback")
    .notEmpty()
    .withMessage("Le nombre d'étoiles du feedback est obligatoire"),
  ];
  