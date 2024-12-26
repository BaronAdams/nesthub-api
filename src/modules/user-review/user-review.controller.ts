import { matchedData, validationResult } from "express-validator"
import { CreateUserReviewDto } from "./dto/create-user-review.dto"
import { createUserReview, deleteUserReview, updateUserReview } from "./user-review.service"
import { Request, Response } from "express"
import { UpdateUserReviewDto } from "./dto/update-user-review.dto"

export const createUserReviewController = async (req: Request, res: Response) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let authorId = JSON.parse(jsonifyUser)?.id as string
        let data = { ...matchedData(req), authorId } as CreateUserReviewDto
        try {
            await createUserReview(data)
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

export const updateUserReviewController = async (req: Request, res: Response) => {
    let result = validationResult(req)
    let errors: any = {}
    if (result.isEmpty()) {
        let data = matchedData(req) as UpdateUserReviewDto
        try {
            await updateUserReview(req.params.id, data)
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

export const deleteUserReviewController = async (req: Request, res: Response) => {
    try {
        await deleteUserReview(req.params.id)
        return res.status(201).json({ success: true, message: 'Le feedback a été supprimé avec succès' })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true, message: "Une erreur est survenue lors de la suppression du feedback" })
    }
}