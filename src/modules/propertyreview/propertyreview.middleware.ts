import { NextFunction, Request, Response } from "express"
import { isAuthenticated } from "../auth/auth.middleware"
import PropertyReview from "./propertyreview.model"

export const isPropertyReviewOwner = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, async () => {
        const propertyReviewId = req.params.id
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let user = JSON.parse(jsonifyUser)
        let propertyReviewfinded = await PropertyReview.findOne({
            where: {
                authorId: user.id,
                id: propertyReviewId
            }
        })
        if (!propertyReviewfinded) return res.status(403).json({ error: true, message: "Vous n'êtes pas autorisé" })
        next()
    })
}