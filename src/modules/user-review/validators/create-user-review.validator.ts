import { body } from "express-validator";

export const createUserReviewValidator = [
    body('authorId')
      .isUUID(4)
      .withMessage("Le format de l'ID de l'auteur du feedback n'est pas valide")
      .notEmpty()
      .withMessage("L'ID de l'auteur de feedback est obligatoire"),
    
    body('userId')
      .isUUID(4)
      .withMessage("Le format de l'ID de l'utilisateur feedbacké n'est pas valide")
      .notEmpty()
      .withMessage("L'ID de l'utilisateur feedbacké est obligatoire")
      .custom((value, { req }) => {
        if(req.body.authorId === value) throw new Error("Un utilisateur ne peut pas se feedbacker lui même");
      }),
    
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
  