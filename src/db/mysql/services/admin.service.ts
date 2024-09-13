import Admin from "../models/admin.model";

export const getAdminByEmail = async(email:string)=>{ 
    try {
        const admin = await Admin.findOne({
            where:{
                email
            }
        })
        return admin?.dataValues
    } catch (error) {
        throw new Error("Une erreur est survenue")
    }
}