import { createProperty, updateProperty, getProperties,searchProperties, getPropertyById } from "./property.service"
import { NextFunction, Request, Response } from "express"
import { matchedData, validationResult, param } from "express-validator"
import { createPropertyDto } from "./property.dto"


export const createPropertyController = async (req: Request, res: Response , next: NextFunction ) =>{  
    let result = validationResult(req)
    if(result.isEmpty()){
        let data = matchedData(req) as createPropertyDto
        try {
            await createProperty(data)
            return res.status(201).json('Un nouvel post a été crée')
        }catch(e){
            console.log(e)
            return res.status(400).json("Une erreur est survenue")
        }
    }else{
        return res.status(400).json({ errors: result.array() });
    }
}


export const getPropertiesController = async (req: Request, res: Response , next: NextFunction ) =>{  
    let result = validationResult(req)
    if(result.isEmpty()){
        try {
            if(req.query){
                let properties = await searchProperties(req.query)
                return res.status(200).json({ success:true, message:"Propiétés trouvées avec succès", properties })
            }else{
                let properties = await getProperties()
                return res.status(200).json({ success:true, message:"Propiétés trouvées avec succès", properties })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json("Une erreur est survenue")
        }
    }
}

export const getPropertyController = async (req: Request, res: Response , next: NextFunction ) =>{  
    try{
        let property = await getPropertyById(req.params.id)
        return res.status(200).json(property)
    } catch (error) {
        console.log(error)
        return res.status(400).json("Une erreur est survenue")
    }
}

