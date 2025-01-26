import { JSONSchema } from 'json-schema-to-ts';

// Schéma JSON standard pour la génération de types
export const updateUserBodyJsonSchema = {
    type: "object",
    required: [],
    properties: {
        firstName: {
            type: "string",
            minLength: 1,
        },
        lastName: {
            type: "string",
            minLength: 1,
        },
        email: {
            type: "string",
            format: "email",
            minLength: 1,
        },
        password: {
            type: "string",
            minLength: 6,
            pattern: "^(?=.*[A-Z]{1,})(?=.*\\d).+$",
        },
        location: {
            type: "string",
            enum: ['Yaoundé', 'Douala', 'Bafoussam', 'Buéa', 'Bamenda', 'Ebolowa', 'Bertoua', 'Ngaoundéré', 'Garoua', 'Maroua'],
        },
        phone: {
            type: "string",
            minLength: 9,
            maxLength: 9,
            pattern: "/[^0-9]/g"
        },
        birthday:{
            type:"string",
            format:"date"
        },
        languages:{
            type: "object",
            properties: {
                french:{
                    type: "string",
                    enum: ['Débutant', 'Courant', 'Expert']
                },
                english:{
                    type: "string",
                    enum: ['Débutant', 'Courant', 'Expert']
                }
            },
            additionalProperties: false,
            required: ["french","english"]
        },
        scores: {
            type: "object",
            properties: {
                property_type: {
                    type: "object",
                    // enum: ['Terrain', 'Villa', 'Salle de fêtes', 'Immeuble', 'Appartement', 'Duplex', 'Studio', 'Chambre d\'hôtel', 'Entrepôt', 'Maison de vacances', 'Bureau', 'Magasin', 'Espace de vente', 'Contenaire', 'Chambre étudiant', 'Maison']
                },
                city: {
                    type: "object",
                    // enum: ['Yaoundé', 'Douala', 'Bafoussam', 'Buéa', 'Bamenda', 'Ebolowa', 'Bertoua', 'Ngaoundéré', 'Garoua', 'Maroua']
                },
                hood: {
                    type: "object",
                },
                // actionType: { 
                //     type: "string",
                //     enum: ['view','like','save','review']
                // },
                userId: {
                    type: "object"
                }
            },
            additionalProperties: false,
            required: []
        },
        additionalProperties: false,
    }
} as const satisfies JSONSchema;