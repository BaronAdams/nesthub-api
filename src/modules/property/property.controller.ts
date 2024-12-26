import { createProperty, updateProperty, getProperties, searchProperties, getPropertyById, likeOrUnlikeProperty, saveOrUnsaveProperty } from "./property.service"
import { NextFunction, Request, Response } from "express"
import { matchedData, validationResult, param } from "express-validator"
import { CreatePropertyDto } from "./dto/create-property.dto"
import { UpdatePropertyDto } from "./dto/update-property.dto"
import { LikeOrSavePropertyDto } from "./dto/like-or-save-property.dto"


export const createPropertyController = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let sellerId = JSON.parse(jsonifyUser)?.id as string
        let data = { ...matchedData(req), sellerId } as CreatePropertyDto
        try {
            await createProperty(data)
            return res.status(201).json({ success: true, message: 'Une nouvelle propriété a été crée' })
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


export const getPropertiesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query) {
            let properties = await searchProperties(req.query)
            return res.status(200).json({ success: true, message: "Propriétés trouvées avec succès", properties })
        } else {
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
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let data = matchedData(req) as LikeOrSavePropertyDto
        try {
            await likeOrUnlikeProperty(req.params.id, data.userId)
            return res.status(201).json({ success: true, message: 'Propriété ajoutée au favoris' })
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

export const saveOrUnSavePropertyController = async (req: Request, res: Response, next: NextFunction) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let data = matchedData(req) as LikeOrSavePropertyDto
        try {
            await saveOrUnsaveProperty(req.params.id, data.userId)
            return res.status(201).json({ success: true, message: 'Propriété enregistrée avec succès' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: true, message: "Une erreur est survenue" })
        }
    } else {
        for (let iss of result.array()) {
            // @ts-ignore
            errors = { ...errors, [iss.path]: iss.msg }
        }
        return res.status(400).json({ error: true, errors: result.array() });
    }
}

