import { Request, Response, NextFunction } from "express"
import { isAdmin } from "../auth/auth.middleware"
import Property from "./property.model"

export const isPropertyOwner = (req: Request, res: Response, next: NextFunction) => {
    isAdmin(req,res, async()=>{
        const postId = req.params.id
        const adminId = req.headers["session-admin-id"]
        let findedPost = await Property.findOne({
            where:{
                // @ts-ignore
                adminId: adminId,
                id: postId
            }
        })
        if(!findedPost) return res.status(403).json("Vous n'êtes pas autorisé")
        next()
    })
}