import { body } from 'express-validator';

export const likeOrSavePropertyValidator = [
  body('userId')
    .isUUID("4")
    .withMessage("L'id de l'utilisateur n'est pas valide")
]