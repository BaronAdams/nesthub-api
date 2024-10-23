import { getAllUsers, getUserById } from "@/modules/user/user.service"
import { NextFunction, Request, Response } from "express"

export const getAllUsersController = async (req: Request, res: Response , next: NextFunction ) =>{  
    try {
        const users = await getAllUsers()
        return res.status(201).json({success: true, users})
    } catch (error) {
        console.log(error)
        return res.status(400).json("Une erreur est survenue")
    }
}

export const getUserController = async (req: Request, res: Response , next: NextFunction ) =>{  
    try {
        const user = await getUserById(req.params.id)
        return res.status(201).json({success: true, user})
    } catch (error) {
        console.log(error)
        return res.status(400).json("Une erreur est survenue")
    }
}