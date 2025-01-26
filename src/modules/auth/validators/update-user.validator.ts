import { body, checkSchema } from "express-validator";

export const updateUserValidator = [
    body('firstName')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage('Le prénom doit être une chaîne de caractères non vide.')
        .isLength({ min: 1 })
        .withMessage('Le prénom est requis.'),

    body('lastName')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage('Le nom doit être une chaîne de caractères non vide.')
        .isLength({ min: 1 })
        .withMessage('Le nom est requis.'),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('L\'adresse email est invalide.')
        .isLength({ min: 1 })
        .withMessage('L\'adresse email est requise.'),

    body('password')
        .optional({ checkFalsy: true })
        .matches(/^(?=.*[A-Z]{1,})(?=.*\d)/)
        .withMessage('Le mot de passe doit contenir au moins 1 chiffre et 1 lettre majuscule.')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères.'),

    body('location')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage('La localisation entrée doit être une chaîne de caractères.')
        .isIn(['Yaoundé', 'Douala', 'Bafoussam', 'Buéa', 'Bamenda', 'Ebolowa', 'Bertoua', 'Ngaoundéré', 'Garoua', 'Maroua'])
        .withMessage("Vous devez être localisé dans l'une des villes du Cameroun"),

    body('phone')
        .optional({ checkFalsy: true })
        .isNumeric()
        .withMessage("Le numéro de telephone doit contenir uniquement des chiffres")
        .isLength({ min: 9, max: 9 })
        .withMessage('Le numéro de telephone doit avoir exactement 9 chiffres'),

    body('languages')
        .optional({ checkFalsy: true })
        .isObject()
        .withMessage('Vous devez préciser votre niveau de langage'),

    body('languages.french')
        .optional({ checkFalsy: true })
        .isIn(['Débutant', 'Courant', 'Expert'])
        .withMessage('La valeur de french doit être "Débutant","Courant" ou "Expert"'),

    body('languages.english')
        .optional({ checkFalsy: true })
        .isIn(['Débutant', 'Courant', 'Expert'])
        .withMessage('La valeur de english doit être "Débutant","Courant" ou "Expert"'),

    body('birthday')
        .optional({ checkFalsy: true })
        .isDate()
        .withMessage('Vous devez préciser une date de naissance')
        .custom((value) => {
            const today = new Date()
            const birthdayDate = new Date(value)
            if (birthdayDate > today) {
                throw new Error("La date de naissance ne peut pas être dans le futur")
            }
            return true
        }),

    body('scores')
        .optional({ checkFalsy: true })
        .isObject()
        .withMessage('Vous devez préciser vos préférences')
        .custom((value) => {
            if (value) {
                if (value.property_type){
                    if(!Array.isArray(value.property_type)) throw new Error(`Les types de propriétés doivent être donnés dans un tableau`)
                    const validPropertyTypes = ['Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison']
                    for (const type of value.property_type) {
                        if (!validPropertyTypes.includes(type)) throw new Error(`Les types de propriétés specifiés doivent être parmi : ${validPropertyTypes.join(', ')}.\n${type} ne fait pas partir de cette liste `)                  
                    }
                }

                if (value.city) {
                    if(!Array.isArray(value.city)) throw new Error(`Les villes de préférences doivent être donnés dans un tableau`)
                    const validCities = ["Bafoussam", "Bamenda", "Bertoua", "Buéa", "Douala", "Ebolowa", "Garoua", "Maroua", "Ngaoundéré", "Yaoundé"]
                    for (const c of value.city) {
                        if (!validCities.includes(c)) throw new Error(`Les villes de préfrences specifiés doivent être parmi : ${validCities.join(', ')}.\n${c} ne fait pas partir de cette liste`)
                    }
                }

                if (value.hood) {
                    if(!Array.isArray(value.city)) throw new Error(`Les lieux de préférences doivent être donnés dans un tableau`)
                    for (const h of value.hood) {
                        if (typeof h !== 'string') throw new Error(`Les lieux de préférences doivent être des chaines de caractères; ${h} n'est pas une chaine de caratères `)        
                    }
                }
                
                if(!value.actionType) throw new Error("Le type d'action doit être précisé")
                const validActions = ['view','prefer', 'like', 'save', 'review']
                if (!validActions.includes(value.actionType)) throw new Error(`Les types d'actions specifiés doivent être parmi : ${validActions.join(', ')}`)
                    
                if(value.userId){
                    if (typeof value.userId !== 'string') throw new Error('L\'id de l\'utilisateur sur lequel vous faites action sur sa propriété doit être une chaîne de caractères ')
                }
            }
            return true;
        }),

    // body('preferences.property_type')
    //     .optional({ checkFalsy: true })
    //     .isArray()
    //     .withMessage('Vos types de propriété préférés doivent être dans un tableau')
    //     .custom((value) => {
    //         const validTypes = ['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex', 'studio']
    //         for (const type of value) {
    //             if (!validTypes.includes(type)) throw new Error(`Les types de propriétés specifiés doivent être parmi : ${validTypes.join(', ')}`)
    //             return true
    //         }
    //     }),

    // body('preferences.city')
    //     .optional({ checkFalsy: true })
    //     .isArray()
    //     .withMessage('Les villes de préférences doivent être dans un tableau')
    //     .custom((value) => {
    //         const validCities = ["Bafoussam", "Bamenda", "Bertoua", "Buéa", "Douala", "Ebolowa", "Garoua", "Maroua", "Ngaoundéré", "Yaoundé"]
    //         for (const city of value) {
    //             if (!validCities.includes(city)) throw new Error(`Les villes de préfrences specifiés doivent être parmi : ${validCities.join(', ')}`)
    //             return true
    //         }
    //     }),

    // body('preferences.hood')
    //     .optional({ checkFalsy: true })
    //     .isArray()
    //     .withMessage('Vos lieux préférés doivent être dans un tableau'),
    // .custom((value)=> {
    //     const validTypes = ['land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex','studio']
    //     for (const type of value){
    //         if(!validTypes.includes(type)) throw new Error(`Les types de propriétés specifiés doivent être parmi : ${validTypes.join(', ')}`)
    //         return true        
    //     }
    // }),

    // body('preferences.minPrice')
    //     .optional({ checkFalsy: true })
    //     .isNumeric()
    //     .withMessage('Votre budget de prix minimum doit être un nombre.')
    //     .custom((value, { req }) => {
    //         if(!req.body.preferences.maxPrice) throw new Error("Vous devez préciser également votre budget maximum ")
    //         if (Number(req.body.preferences.maxPrice) < Number(value)) throw new Error("Le budget maximum ne peut pas être inférieur au budget minimum")
    //     }),

    // body('preferences.maxPrice')
    //     .optional({ checkFalsy: true })
    //     .isNumeric()
    //     .withMessage('Votre budget de prix minimum doit être un nombre.')
    //     .custom((value, { req }) => {
    //         if(!req.body.preferences.minPrice) throw new Error("Vous devez préciser également votre budget minimum ")
    //         if (Number(req.body.preferences.minPrice) > Number(value)) throw new Error("Le budget minimum ne peut pas être supérieur au budget maximum")
    //     }),

];