import { error } from "console";
import { response } from "express";

const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let uniqueId = ''
    for (let i = 0; i < 6; i++) {
        uniqueId += '0123456789'[Math.floor(Math.random()*10)]; 
    }
    for (let j = 0; j < 19; j++) {
        uniqueId += characters[Math.floor(Math.random()*36)]; 
    }
    return uniqueId
}

export const createError = (status: number, message?: string, errors:object | any[] = {})=>{
    if(message?.length && Object.keys(errors).length) return response.status(status).json({error:true, message, errors})
    if(message?.length && !Object.keys(errors).length) return response.status(status).json({error:true, message})
    if(!message?.length && Object.keys(errors).length) return response.status(status).json({error:true, errors})
    return response.status(500).json({error:true, messgae: "Une erreur est survenue lors de la création de l'erreur" })
}

export const createSuccess = (status: number, message: string) => response.status(status).json({success:true, message})

