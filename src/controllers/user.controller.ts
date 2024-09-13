import { getAllUsers } from "@/db/mysql/services/user.service"
import { NextFunction, Request, Response } from "express"

export const getAllUsersController = async (req: Request, res: Response , next: NextFunction ) =>{  
    // if(req.q)
    try {
        const users = await getAllUsers()
        return res.status(201).json({success: true, users})
    } catch (error) {
        console.log(error)
        return res.status(400).json("Une erreur est survenue")
    }
}