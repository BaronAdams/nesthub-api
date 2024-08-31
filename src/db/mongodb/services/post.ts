import Post from "@/db/mongodb/models/post";
import { Request, Response } from "express";

export const getPostById = async(id:string) => await Post.findById(id)    
export const createPost = async(req: Request,res:Response,email:string)=>{

}