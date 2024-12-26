import { Request, Response, NextFunction } from "express"
import { isAuthenticated } from "../auth/auth.middleware"
import Property from "./property.model"

export const isPropertyOwner = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, async () => {
        const postId = req.params.id
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let user = JSON.parse(jsonifyUser)
        let propertyfinded = await Property.findOne({
            where: {
                // @ts-ignore
                sellerId: user.id,
                id: postId
            }
        })
        if (!propertyfinded) return res.status(403).json({ error: true, message: "Vous n'êtes pas autorisé" })
        next()
    })
}