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
        if(!findedPost) return res.status(403).json({error:true, message:"Vous n'êtes pas l'auteur du post, vous ne pouvez pas y effectuer des modifications"})
        next()
    })
}
