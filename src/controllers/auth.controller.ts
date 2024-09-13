import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express"
import { createUser, getUserByEmail, getUserById, updateUser } from "../db/mysql/services/user.service"
import { createToken, refreshToken, UserPayload } from "../utils/jwt"
import { RequestWithUserPayload } from "../middlewares/auth.middleware"
import { validationResult, matchedData } from "express-validator"
import { loginUserDto, registerUserDto } from "../dto/auth.dto"
import { createBlackListedToken } from "../db/mysql/services/blt.service"
import { IUserAttributes } from '@/db/mysql/models/user.model'
import { createError, createSuccess } from '@/utils/helper'

const isValidPassword = async (rawPassword:string, hash:string)=> {
    return await bcrypt.compare(rawPassword, hash)
}

const hashPassword = async (password:string)=> {
    const salt = bcrypt.genSaltSync(10)
    return await bcrypt.hash(password, salt)
}


export const signup = async (req:Request, res:Response)=> {
    let result = validationResult(req)
    if(result.isEmpty()){
        try{
            let data = matchedData(req) as registerUserDto
            let existingUser = await getUserByEmail(data.email)
            if(existingUser) return res.status(400).json({ error: true, message: "Email déja utilisé" })
            try {
                data.password = await hashPassword(data.password)
                data.role = "both"
                await createUser(data)
                return res.status(201).json({ success:true, message:'Un nouvel utilistateur a été crée' })
            }catch(e){
                return res.status(400).json({ error:true, message:"Une erreur est survenue. Veuillez réessayer" })
            }
        }catch(e){
            return res.status(500).json({ error:true, message:"Une erreur est survenue. Veuillez réessayer" })
        }
    }
    return res.status(400).json({ error:true, errors: result.array() });
}

export const login = async (req:Request, res:Response, next: NextFunction) => {
    // if(req.payload?.userId) return res.status(401).json({ success: false, message:"Vous êtes déja authentifié!" })
    let result = validationResult(req)
    if(result.isEmpty()){
        try {
            let data = matchedData(req) as loginUserDto
            const user = await getUserByEmail(data.email)
            if(!user) return createError(401, "Utilisateur non trouvé")
            const valid = await isValidPassword(data.password, user.password)
            if(!valid) return createError(401,'Mot de passe incorrect')
            const token = createToken({ userId: String(user.id), role: user.role, email: user.email })
            if(!token) return createError(500,'Une erreur est survenue')
            user.update({lastLoginDate: new Date()})
            let expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60* 1000).toISOString()
            return res.status(201).json({ success:true, accessToken: token, expiresAt })

        } catch(e){
            return res.status(500).json("Une erreur est survenue. Veuillez réessayer")
        }
    } 
    return createError(400,"Erreur lors de la validation de données", result.array());
}

export const logout = async (req:Request, res:Response) => {
    const [type, token] = req.headers?.authorization?.split(" ") ?? []
    if(type !== "Bearer") return createError(403,"Vous n'êtes pas autorisé")
    if(!token) return createError(401,"Vous n'êtes pas authentifié pour vous déconnecter")
    try {
        await createBlackListedToken(token)
        return createSuccess(201,"Deconnexion reussie")
    } catch(e){
        return createError(500,"Une erreur est survenue lors de la deconnexion. Veuillez réessayer")
    }
}

type UserSession = {
    user: IUserAttributes,
    refreshToken?: string | null
}

export const getUserSession = async(req:RequestWithUserPayload, res:Response)=>{
    try {
        const user = await getUserById(req.payload?.userId as string)
        const newToken = refreshToken(req.payload as UserPayload)
        if(user){
            user.update({ lastSessionDate: new Date() })
            const { password, ...others } = user.dataValues
            if(newToken) {
                let expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60* 1000).toISOString()
                return res.status(200).json({ success:true , user:others, accessToken: newToken, expiresAt})
            }else{
                return res.status(200).json({ success:true , user:others})
            }
        }
    } catch (error) {
        return createError(500,"Une erreur est survenue !")
    }
}
