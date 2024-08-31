import Blacklistedtoken from "@/db/mongodb/models/blacklistedtoken";

export const createBlackListedToken = async(token:string) =>{
    const newBlackToken = new Blacklistedtoken({token})
    newBlackToken.save()
}

export const isTokenBlackListed = async(token:string) =>{
    try {
        const result = await Blacklistedtoken.findOne({token})
        return !!result
    } catch (error) {
        return null
    }
}