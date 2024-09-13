import BlackListedToken from "../models/blt.model"

export const createBlackListedToken = async(token:string) =>{
    try {
        await BlackListedToken.create({token})
    } catch (error) {
        console.log("Une erreur est survenue lors de la déconnexion de votre token")
    }
}

export const isTokenBlackListed = async(token:string) =>{
    try {
        const result = await BlackListedToken.findOne( { where:{ token } } )
        return !!result
    } catch (error) {
        return null
    }
}