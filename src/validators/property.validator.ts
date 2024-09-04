import { body } from 'express-validator';

export interface IPropertyAttributes {
    id: string;
    title: string;
    type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    status: 'for_sale' | 'for_rent';
    place: string;
    furnished?: boolean;
    price: number;
    priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly" ;
    sellerId?: string;
    agentId: string;
    area: number;
    description?: string;
    rooms?:{
        bedrooms: number;
        livingRooms: number;
        kitchens: number;
        bathrooms: number
    };
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
}


export const createPropertyValidator = [
    body('title').notEmpty().withMessage("Le titre de la propriété est réquis").isString().withMessage("Le titre de la propriété doit être une chaîne de caratères"),
    body('type').isIn(['land','villa','apartment','duplex','building','eventHall']).withMessage("Le type de propriété doit être parmi la liste suivante: land, villa, appartment,..."),
    body('status').isIn(['for_rent','for_sale']).withMessage("Votre propriété doit être soit à louer (for_rent) , soit à vendre (for_sale)"),
    body('place').isString().withMessage("L'endroit de la propriété doit être précisé"),
    body('price').isFloat({ gt: 0 }).withMessage("Le prix est réquis et doit être superieur à 0")
];

export const updatePostValidator = [
    body('title').optional({ checkFalsy: true }).isString().withMessage("Le titre du post doit être une chaîne de caratères"),
    body('content').optional({ checkFalsy: true }).isString().withMessage("Le contenu du post doit être une chaîne de caratères"),
    body('coverPic').optional({ checkFalsy: true }).isString().withMessage("Vous devez mettre une URL pour l'image de couverture pour votre post")
];