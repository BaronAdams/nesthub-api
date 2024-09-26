import { NextFunction, Request, Response } from 'express'
import { decryptToken, UserPayload } from '../utils/jwt'
import { getUserById, updateUser } from '../db/mysql/services/user.service'
import { isTokenBlackListed } from '../db/mysql/services/blt.service'
import { getAdminByEmail } from '../db/mysql/services/admin.service'
import Post from '../db/mysql/models/post.model'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const [type, token] = req.headers?.authorization?.split(" ") ?? []
    if(type !== "Bearer") return res.status(403).json("Vous n'êtes pas autorisé")
    if(!token) return res.status(401).json("Vous n'avez pas de jeton JWT")
    try {
        let isBlackToken = await isTokenBlackListed(token)
        if(isBlackToken) return res.status(401).json("Vous n'êtes pas connecté")
        const decodedToken = decryptToken(token)
        if(!decodedToken) return res.status(401).json("Votre jéton est invalide")
        let user = await getUserById(decodedToken.userId)
        if(!user) return res.status(401).json("Vous n'êtes pas identifié")    
        req.headers["session-payload"] = JSON.stringify(decodedToken)     
        next()  
    }catch (error) {
        return res.status(500).json("Une erreur est survenue") 
    }       
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req,res, async()=>{
        let jsonifyPayload = req.headers["session-payload"] ? req.headers["session-payload"] : ""
        // @ts-ignore
        let payload = JSON.parse(jsonifyPayload)
        if(payload?.email) {
            let admin = await getAdminByEmail(payload.email)
            if(!admin?.id) return res.status(403).json("Vous n'êtes pas un admin")   
            if(payload.role !== "admin") await updateUser(payload.userId, {role:"admin"})
            req.headers["session-admin-id"] = admin?.id
            next()
        }else{
            return res.status(403).json("Vous n'êtes pas autorisés")
        }
    })
}

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


