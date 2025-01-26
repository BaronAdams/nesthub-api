import { createProperty, updateProperty, getProperties, searchProperties, getPropertyById, likeOrUnlikeProperty, saveOrUnsaveProperty } from "./property.service"
import { NextFunction, Request, Response } from "express"
import { matchedData, validationResult, param } from "express-validator"
import { CreatePropertyDto } from "./dto/create-property.dto"
import { UpdatePropertyDto } from "./dto/update-property.dto"
import { Preferences } from "../user/user.model"

export const createPropertyController = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let sellerId = JSON.parse(jsonifyUser)?.id as string
        let data = { ...matchedData(req), sellerId } as CreatePropertyDto
        try {
            let newProperty = await createProperty(data)
            if (!newProperty) return res.status(400).json({ error: true, message: "Une erreur est survenue" })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: true, message: "Une erreur est survenue" })
        }
        return res.status(201).json({ success: true, message: 'Une nouvelle propriété a été crée' })
    } else {
        for (let iss of result.array()) {
            // @ts-ignore
            errors = { ...errors, [iss.path]: iss.msg }
        }
        return res.status(400).json({ error: true, errors });
    }
}

export const getPropertiesController = async (req: Request, res: Response, next: NextFunction) => {
    let url = req.originalUrl.split('?')[0]
    try {
        if (url === "/api/properties/recommanded") {
            let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
            // @ts-ignore
            let { property_type, hood, city, userId } = JSON.parse(jsonifyUser)?.scores
            let userPreferences : any = {}
            if(property_type){
                userPreferences.property_type = Object.entries(property_type)
                // @ts-ignore
                                                    .sort((a,b) => b[1] - a[1])
                                                    .map(entry => entry[0])
                                                    .join(",")
            }
            if(hood){
                userPreferences.hood = Object.entries(hood)
                // @ts-ignore
                                                    .sort((a,b) => b[1] - a[1])
                                                    .map(entry => entry[0])
                                                    .join(",")
            }
            if(city){
                userPreferences.city = Object.entries(city)
                // @ts-ignore
                                                    .sort((a,b) => b[1] - a[1])
                                                    .map(entry => entry[0])
                                                    .join(",")
            }
            if(userId){
                userPreferences.sellerId = Object.entries(userId)
                // @ts-ignore
                                                    .sort((a,b) => b[1] - a[1])
                                                    .map(entry => entry[0])
                                                    .join(",")
            }
            let properties = await searchProperties({ ...req.query, ...userPreferences })
            return res.status(200).json({ success: true, message: "Propriétés recommandées pour l'utilisateur trouvées avec succès", properties })

        } else if (url === "/api/properties/latest") {
            let properties = await searchProperties({ ...req.query, orderByLatest: true })
            return res.status(200).json({ success: true, message: "Propriétés recemment ajoutées trouvées avec succès", properties })
        }
        else if (url === "/api/properties/trending") {
            let properties = await searchProperties({ ...req.query, orderByTrend: true })
            return res.status(200).json({ success: true, message: "Propriétés en vedette trouvées avec succès", properties })
        }
        else {
            let properties = await getProperties()
            return res.status(200).json({ success: true, message: "Propriétés trouvées avec succès", properties })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: true, message: "Une erreur est survenue" })
    }
}

export const getPropertyController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let property = await getPropertyById(req.params.id)
        return res.status(200).json({ success: true, message: "Propriété trouvée avec succès", property })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: true, message: "Une erreur est survenue" })
    }
}

export const likeOrUnlikePropertyController = async (req: Request, res: Response, next: NextFunction) => {
    let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
    // @ts-ignore
    let userId = JSON.parse(jsonifyUser)?.id
    try {
        let message = await likeOrUnlikeProperty(req.params.id, userId)
        if(!message) return res.status(400).json({ error: true, message: "Une erreur est survenue" })
        return res.status(201).json({ success: true, message })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true, message: "Une erreur est survenue" })
    }
}

export const saveOrUnSavePropertyController = async (req: Request, res: Response, next: NextFunction) => {
    let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
    // @ts-ignore
    let userId = JSON.parse(jsonifyUser)?.id
    try {
        let message = await saveOrUnsaveProperty(req.params.id, userId)
        if(!message) return res.status(400).json({ error: true, message: "Une erreur est survenue" })
        return res.status(201).json({ success: true, message })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true, message: "Une erreur est survenue" })
    }
}

export const updatePropertyController = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let data = matchedData(req) as UpdatePropertyDto
        try {
            let updatedProperty = await updateProperty(req.params.id, data)
            if (!updatedProperty) return res.status(400).json({ error: true, message: "La propriété n'a pas été modifiée, il ya une erreur" })
            return res.status(201).json({ success: true, message: 'Propriété modifiée avec succès' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: true, message: "Une erreur est survenue" })
        }
    } else {
        for (let iss of result.array()) {
            // @ts-ignore
            errors = { ...errors, [iss.path]: iss.msg }
        }
        return res.status(400).json({ error: true, errors });
    }
}

