import { NextFunction, Request, Response } from "express"
import { isAuthenticated } from "../auth/auth.middleware"
import UserReview from "./user-review.model"

export const isUserReviewOwner = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, async () => {
        const userReviewId = req.params.id
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let user = JSON.parse(jsonifyUser)
        let UserReviewfinded = await UserReview.findOne({
            where: {
                authorId: user.id,
                id: userReviewId
            }
        })
        if (!UserReviewfinded) return res.status(403).json({ error: true, message: "Vous n'êtes pas autorisé" })
        next()
    })
}