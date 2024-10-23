import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "./post.service"
import { createPostDto, updatePostDto } from "./post.dto"
import { NextFunction, Request, Response } from "express"
import { matchedData, validationResult, param } from "express-validator"


export const createPostController = async (req: Request, res: Response , next: NextFunction ) =>{  
    let result = validationResult(req)
    if(result.isEmpty()){
        let data = matchedData(req) as createPostDto
        let sessionadminId = req.headers["session-admin-id"] as string
        if(sessionadminId) data.adminId = sessionadminId
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


export const getAllPostsController = async (req: Request, res: Response , next: NextFunction ) =>{  
    try {
        const posts = await getAllPosts()
        return res.status(201).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(400).json("Une erreur est survenue")
    }
}

// exports.getPosts = async (req: Request, res: Response , next: NextFunction ) =>{
//     try {
//         const userId = req.query.user
//         if(userId){
//             const posts = await Post.find({ author: userId })
//                                     .sort({ createdAt: -1 })
//                                     .populate('author', 'username email profilePic')
            
//             return res.status(201).json(posts)
//         }else{
//             const posts = await Post.find()
//                                     .sort({ createdAt: -1 })
//                                     .populate('author', 'username email profilePic')
//             return res.status(201).json(posts)
//         }
        
//     } catch (error) {
//         return res.status(400).json(error)
//     }
// }

export const getPostController = async (req: Request, res: Response , next: NextFunction ) =>{
    try {
        const findedPost = await getPostById(req.params.id)
        return res.status(200).json(findedPost)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const updatePostController = async (req: Request, res: Response , next: NextFunction ) =>{
    let result = validationResult(req)
    if(result.isEmpty()){
        let data = matchedData(req) as updatePostDto
        await updatePost(req.params.id, data)
        return res.status(201).json("Post modifié avec succès")
    }     
    return res.status(400).json({ errors: result.array() });
}

export const deletePostController = async (req: Request, res: Response , next: NextFunction ) =>{
    try {
        const post = await deletePost(req.params.id)
        // fs.unlink(`images/${post.image}`,async ()=> {
        //     try {
        //         await post.destroy();
        //         return res.status(200).json('Post supprimé')
        //     } catch (error) {
        //         res.status(500).json(error)
        //     }
        // })        
        return res.status(201).json("Post supprimé avec succès")
    } catch (error) {
        return res.status(500).json(error)
    }
}