import { Request, Response, NextFunction } from "express"
import { isAdmin } from "../admin/admin.middleware"
import Post from "./post.model"

export const isPostOwner = (req: Request, res: Response, next: NextFunction) => {
    isAdmin(req,res, async()=>{
        const postId = req.params.id
        const adminId = req.headers["session-admin-id"]
        let findedPost = await Post.findOne({
            where:{
                adminId,
                id: postId
            }
        })
        if(!findedPost) return res.status(403).json("Vous n'êtes pas autorisé")
        next()
    })
}
