import { NextFunction, Request, Response } from 'express'
import { isAuthenticated } from '../auth/auth.middleware'

export const isSeller = (req: Request, res: Response, next: NextFunction) => {
    isAuthenticated(req,res, async()=>{
        let jsonifyUser = req.headers["session-user"] ? req.headers["session-user"] : ""
        // @ts-ignore
        let user = JSON.parse(jsonifyUser)
        if(user?.role == "buyer") return res.status(403).json({error: true, message:"Vous n'avez pas un compte marchand pour effectuer cette action"})
        next() 
    })
}