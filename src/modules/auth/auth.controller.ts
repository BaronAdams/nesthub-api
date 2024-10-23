import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express"
import { createUser, getUserByEmail, getUserById, updateUser } from "../user/user.service"
import { createToken, refreshToken, UserPayload } from "../../common/utils/jwt"
import { validationResult, matchedData } from "express-validator"
import { loginUserDto, registerUserDto } from "./auth.dto"
import { createBlackListedToken } from "../blt/blt.service"
import { createError, createSuccess } from '../../common/utils/helper'
import { RegisterUserDto } from './dto/register-user.dto'

const isValidPassword = async (rawPassword:string, hash:string)=> {
    return await bcrypt.compare(rawPassword, hash)
}

const hashPassword = async (password:string)=> {
    const salt = bcrypt.genSaltSync(10)
    return await bcrypt.hash(password, salt)
}

export const signup = async (req:Request, res:Response)=> {
    try{
        let data = req.body as RegisterUserDto
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

export const login = async (req:Request, res:Response, next: NextFunction) => {
    let result = validationResult(req)
    if(result.isEmpty()){
        try {
            let data = matchedData(req) as loginUserDto
            const user = await getUserByEmail(data.email)
            if(!user) return createError(401, "Utilisateur non trouvé")
            const valid = await isValidPassword(data.password, user.password)
            if(!valid) return createError(401,'Mot de passe incorrect')
            const token = createToken({ userId: String(user.id) })
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

export const getUserSession = async(req:Request, res:Response)=>{
    try {
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] as string : ""
        const user = JSON.parse(jsonifyUser)
        let jsonifyPayload = req.headers["session-payload"] ? req.headers["session-payload"] as string : ""
        let payload = JSON.parse(jsonifyPayload)
        const newToken = refreshToken(payload as UserPayload)
        if(user?.id){
            user.update({ lastSessionDate: new Date() })
            if(newToken) {
                let expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60* 1000).toISOString()
                return res.status(200).json({ success:true , user, accessToken: newToken, expiresAt})
            }else{
                return res.status(200).json({ success:true , user})
            }
        }
    } catch (error) {
        return createError(500,"Une erreur est survenue !")
    }
}
