import { matchedData, validationResult } from "express-validator"
import { CreatePropertyReviewDto } from "./dto/create-property-review.dto"
import { createPropertyReview, deletePropertyReview, updatePropertyReview } from "./propertyreview.service"
import { Request, Response } from "express"
import { UpdatePropertyReviewDto } from "./dto/update-property-review.dto"

export const createPropertyReviewController = async (req: Request, res: Response) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let authorId = JSON.parse(jsonifyUser)?.id as string
        let data = { ...matchedData(req), authorId } as CreatePropertyReviewDto
        try {
            await createPropertyReview(data)
            return res.status(201).json({ success: true, message: 'Le feedback a été crée' })
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

export const updatePropertyReviewController = async (req: Request, res: Response) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let data = matchedData(req) as UpdatePropertyReviewDto
        try {
            await updatePropertyReview(req.params.id, data)
            return res.status(201).json({ success: true, message: 'Le feedback a été modifié avec succès' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: true, message: "Une erreur est survenue lors de la modification du feedback" })
        }
    } else {
        for (let iss of result.array()) {
            // @ts-ignore
            errors = { ...errors, [iss.path]: iss.msg }
        }
        return res.status(400).json({ error: true, errors });
    }
}

export const deletePropertyReviewController = async (req: Request, res: Response) => {
    try {
        await deletePropertyReview(req.params.id)
        return res.status(201).json({ success: true, message: 'Le feedback a été supprimé avec succès' })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true, message: "Une erreur est survenue lors de la suppression du feedback" })
    }
}