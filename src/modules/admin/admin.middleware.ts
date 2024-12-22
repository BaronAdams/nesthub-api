import { Request, Response, NextFunction } from "express"
import { isAuthenticated } from "../auth/auth.middleware"
import { getAdminByEmail } from "./admin.service"
import { updateUser } from "../user/user.service"

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req,res, async()=>{
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let user = JSON.parse(jsonifyUser)
        if(user?.email) {
            let admin = await getAdminByEmail(user.email)
            if(!admin?.id) return res.status(403).json("Vous n'êtes pas un admin")   
            if(user.role !== "admin") await updateUser(user.id, {role:"admin"})
            req.headers["session-admin-id"] = admin?.id
            next()
        }else{
            return res.status(403).json("Vous n'êtes pas autorisés")
        }
    })
}