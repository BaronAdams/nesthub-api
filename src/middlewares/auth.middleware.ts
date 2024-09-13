import { NextFunction, Request, Response } from 'express'
import { decryptToken, UserPayload } from '../utils/jwt'
import { getUserById, updateUser } from '../db/mysql/services/user.service'
import { isTokenBlackListed } from '../db/mysql/services/blt.service'
import { getAdminByEmail } from '../db/mysql/services/admin.service'
import Post from '../db/mysql/models/post.model'

export interface RequestWithUserPayload extends Request{
    payload?: UserPayload
}

export interface RequestWithAdminPayload extends RequestWithUserPayload{
    payload?: UserPayload,
    adminId?: string
}

// export const canLogin = (req: RequestWithUserPayload, res: Response, next: NextFunction) => {
//     const token = req.headers?.authorization?.split(" ")[1] ?? [][1]
//     if(!token) next()
//     isTokenBlackListed(token)
//         .then((isBlackToken)=>{if(isBlackToken) next()})
//     try {
//        const decodedToken = decryptToken(token)
//        if(!decodedToken) return res.status(401).json("Votre jéton est invalide")
//        getUserById(decodedToken.userId)
//         .then((user)=>{
//             if(!user) return res.status(401).json("Vous n'êtes pas identifié") 
//             req.payload = decodedToken        
//             next()  
//         })
//         .catch((e)=> res.status(500).json("Une erreur est survenue"))
//     }catch (error) {
//         return res.status(500).json("Une erreur est survenue") 
//     }       
// }

export const isAuthenticated = async (req: RequestWithUserPayload, res: Response, next: NextFunction) => {
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
        req.payload = decodedToken        
        next()  
    }catch (error) {
        return res.status(500).json("Une erreur est survenue") 
    }       
}

export const isAdmin = (req: RequestWithAdminPayload, res: Response, next: NextFunction) => {
    isAuthenticated(req,res, async()=>{
        if(req.payload?.email) {
            let admin = await getAdminByEmail(req.payload.email)
            if(!admin?.id) return res.status(403).json("Vous n'êtes pas un admin")   
            if(req.payload.role !== "admin") await updateUser(req.payload.userId, {role:"admin"})
            req.adminId = admin?.id
            next()
        }else{
            return res.status(403).json("Vous n'êtes pas autorisés")
        }
    })
}

export const isPostOwner = (req: RequestWithAdminPayload, res: Response, next: NextFunction) => {
    isAdmin(req,res, async()=>{
        const postId = req.params.id
        let findedPost = await Post.findOne({
            where:{
                adminId: req.adminId,
                id: postId
            }
        })
        if(!findedPost) return res.status(403).json("Vous n'êtes pas autorisé")
        next()
    })
}


