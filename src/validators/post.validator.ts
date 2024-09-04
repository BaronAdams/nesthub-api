import { body } from 'express-validator';

export const createPostValidator = [
    body('title').notEmpty().withMessage("Le titre du post est réquis").isString().withMessage("Le titre du post doit être une chaîne de caratères"),
    body('content').notEmpty().withMessage("Votre post doit avoir un contenu").isString().withMessage("Le contenu du post doit être une chaîne de caratères"),
    body('coverPic').notEmpty().withMessage("Vous devez mettre une image de couverture pour votre post").isString().withMessage("Vous devez mettre une URL pour l'image de couverture pour votre post")
];

export const updatePostValidator = [
    body('title').optional({ checkFalsy: true }).isString().withMessage("Le titre du post doit être une chaîne de caratères"),
    body('content').optional({ checkFalsy: true }).isString().withMessage("Le contenu du post doit être une chaîne de caratères"),
    body('coverPic').optional({ checkFalsy: true }).isString().withMessage("Vous devez mettre une URL pour l'image de couverture pour votre post")
];

