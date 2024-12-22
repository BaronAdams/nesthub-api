import { body } from "express-validator";

export const createChatValidator = [
  body("isGroup")
    .isBoolean()
    .withMessage("isGroup doit être un booléen.")
    .default(false), // Défaut à `false` si non fourni

  body("title")
    .if(body("isGroup").equals("true")) // Rendre `title` obligatoire si `isGroup` est vrai
    .notEmpty()
    .withMessage("Le titre est obligatoire pour un groupe.")
    .isString()
    .withMessage("Le titre doit être une chaîne de caractères."),

  body("participants")
    .isArray({ min: 2 })
    .withMessage("Une discussion doit inclure au moins deux participants."),
  body("participants.*")
    .isUUID()
    .withMessage("Chaque participant doit être un UUID valide."),
];
