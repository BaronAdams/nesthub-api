import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import { createUser, getUserByEmail, getUserById } from "../db/mysql/services/user.service"
import { createToken, refreshToken } from "../utils/jwt"
import { RequestWithUserPayload } from "../middlewares/auth.middleware"
import { validationResult, matchedData } from "express-validator"
import { loginUserDto, registerUserDto } from "../dto/auth.dto"
import { createBlackListedToken } from "../db/mysql/services/blt.service"

export const isValidPassword = async (rawPassword:string, hash:string)=> {
    return await bcrypt.compare(rawPassword, hash)
}
export const hashPassword = async (password:string)=> {
    return await bcrypt.hash(password, 10)
}


export const signup = async (req:Request, res:Response)=> {
    let result = validationResult(req)
    if(result.isEmpty()){
        try{
            let data = matchedData(req) as registerUserDto
            let existingUser = await getUserByEmail(data.email)
            if(existingUser) return res.status(400).json("Email déja utilisé")
            try {
                data.password = await hashPassword(data.password)
                data.role = "both"
                await createUser(data)
                return res.status(201).json('Un nouvel utilistateur a été crée')
            }catch(e){
                return res.status(400).json("Une erreur est survenue. Veuillez réessayer")
            }
        }catch(e){
            return res.status(500).json("Une erreur est survenue. Veuillez réessayer")
        }
    }
    return res.status(400).json({ errors: result.array() });
}

export const login = async (req:Request, res:Response) => {
    let result = validationResult(req)
    if(result.isEmpty()){
        try {
            let data = matchedData(req) as loginUserDto
            const user = await getUserByEmail(data.email)
            if(!user) return res.status(401).json('Utilisateur non trouvé')
            try {
                const valid = await isValidPassword(data.password, user.password)
                if(!valid) return res.status(401).json('Mot de passe incorrect')
                const token = createToken({ userId: String(user.id), role: user.role, email: user.email})
                if(!token) return res.status(500).json('Une erreur est survenue')
                return res.status(201).json({ accessToken: token, expiresAt: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) })
            } catch(e){
                return res.status(500).json("Une erreue est survenue. Veuillez réessayer")
            }
        } catch(e){
            return res.status(500).json("Une erreur est survenue. Veuillez réessayer")
        }
    } 
    return res.status(400).json({ errors: result.array() });
}

export const logout = async (req:Request, res:Response) => {
    const [type, token] = req.headers?.authorization?.split(" ") ?? []
    if(type !== "Bearer") return res.status(403).json("Vous n'êtes pas autorisé")
    if(!token) return res.status(401).json("Vous n'êtes pas authentifié pour vous déconnecter")
    try {
        await createBlackListedToken(token)
        return res.status(201).json("Deconnexion reussie")
    } catch(e){
        return res.status(500).json("Une erreur est survenue lors de la deconnexion. Veuillez réessayer")
    }
}

export const getUserSession = async(req:RequestWithUserPayload, res:Response)=>{
    try {
        const user = await getUserById(req.payload?.userId as string)
        if(user){
            const { password, ...others } = user.dataValues
            return res.status(200).json(others)
        }
    } catch (error) {
        return res.status(200).json("Une erreur est survenue !")
    }
}

export const refreshSession = (req:RequestWithUserPayload, res:Response) =>{
    if(req.payload){
        try {
            const newToken = refreshToken(req.payload)
            return res.status(201).json({ accessToken: newToken, expiresAt: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) })
        } catch (error) {
            return res.status(500).json("Une erreur est survenue")
        }
    }else{
        return res.status(403).json("Vous n'êtes pas authentifié")
    }
}