import { body } from 'express-validator';

export const createPostValidator = [
  body('title')
    .isString()
    .withMessage('Le titre doit être une chaîne de caractères non vide.')
    .isLength({ min: 1 })
    .withMessage('Le titre est requis.'),

  body('content')
    .isString()
    .withMessage('Le contenu du post doit être une chaîne de caractères.'),

  body('adminId')
    .isString()
    .withMessage("L'identifiant de l'admin auteur du post est requis et doit être une chaîne de caractères.")
    .notEmpty()
    .withMessage("L'ID de l'admin auteur du post doit être specifié"),

  body('coverPic')
    .isURL()
    .withMessage("L'image doit être un lien URL valide"),
];
