import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../db/mysql/services/post.service"
import { createPostDto, updatePostDto } from "../dto/post.dto"
import { RequestWithAdminPayload, RequestWithUserPayload } from "../middlewares/auth.middleware"
import { NextFunction, Request, Response } from "express"
import { matchedData, validationResult, param } from "express-validator"


export const createPropertyController = async (req: RequestWithAdminPayload, res: Response , next: NextFunction ) =>{  
    let result = validationResult(req)
    if(result.isEmpty()){
        let data = matchedData(req) as createPostDto
        if(req.adminId) data.adminId = req.adminId
        try {
            await createPost(data)
            return res.status(201).json('Un nouvel post a été crée')
        }catch(e){
            console.log(e)
            return res.status(400).json("Une erreur est survenue")
        }
    }else{
        return res.status(400).json({ errors: result.array() });
    }
}


export const getAllPropertiesController = async (req: Request, res: Response , next: NextFunction ) =>{  
    try {
        const posts = await getAllPosts()
        return res.status(201).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(400).json("Une erreur est survenue")
    }
}
