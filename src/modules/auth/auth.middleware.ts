import { NextFunction, Request, Response } from 'express'
import { decryptToken, UserPayload } from '../../common/utils/jwt'
import { getUserById, updateUser } from '../user/user.service'
import { isTokenBlackListed } from '../blt/blt.service'
import { getAdminByEmail } from '../admin/admin.service'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const [type, token] = req.headers?.authorization?.split(" ") ?? []
    if (type !== "Bearer") return res.status(403).json({ error: true, message: "Vous n'êtes pas autorisés" })
    if (!token) return res.status(401).json({ error: true, message: "Vous n'avez pas de jeton d'authentification " })
    try {
        let isBlackToken = await isTokenBlackListed(token)
        if (isBlackToken) return res.status(401).json({ error: true, message: "Le jeton d'authentification n'est plus valide" })
        const decodedToken = decryptToken(token)
        if (!decodedToken) return res.status(401).json({ error: true, message: "Votre jéton est invalide ou a expiré" })
        let user = await getUserById(decodedToken.userId)
        if (!user) return res.status(401).json({ error: true, message: "Vous n'êtes pas identifié" })
        const { password, ...others } = user.dataValues
        req.headers["session-payload"] = JSON.stringify(decodedToken)
        req.headers["session-user"] = JSON.stringify(others)
        next()
    } catch (error) {
        return res.status(500).json({ error: true, message: "Une erreur est survenue" })
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req, res, async () => {
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let user = JSON.parse(jsonifyUser)
        if (user?.email) {
            let admin = await getAdminByEmail(user.email)
            if (!admin?.id) return res.status(403).json({ error: true, message: "Vous n'êtes pas un administrateur" })
            if (user.role !== "admin") await updateUser(user.id, { role: "admin" })
            req.headers["session-admin-id"] = admin?.id
            next()
        } else {
            return res.status(403).json({ error: true, message: "Vous n'êtes pas autorisés" })
        }
    })
}






