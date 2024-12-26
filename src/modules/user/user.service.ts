import User from "./user.model";
import { updateUserDto } from "../auth/auth.dto";
import { getAdminByEmail } from "../admin/admin.service";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
 
export const getUserById = async (id:string): Promise<User | null > => await User.findByPk(id)
export const getUserByEmail = async(email:string): Promise<User | null>=> await User.findOne({
    where:{
        email
    }
})
export const getAllUsers = async() : Promise<User[]>=> await User.findAll({
    attributes : [ 'id', 'firstName', 'lastName', 'email', 'role', 'profilePic' ]
})

export const createUser = async(data: RegisterUserDto) : Promise<void> => {
    try {
        const newUser = await User.create(data)
        const isAdmin = await getAdminByEmail(data.email)
        if(isAdmin) {
            newUser.update({role:'admin'})
            console.log("New admin confirmed")
        }
    } catch (error) {
        throw new Error("Une erreur est survenue lors de la création d'un utilisateur")
    }
}

export const updateUser = async(id:string, data: updateUserDto)=> {
    const user = await User.findByPk(id)
    if(!user) throw new Error("Le user n'existe pas")
    user.update({...data, updatedAt: new Date()})
}

export const updateOnlyUser = async(id:string, data: updateUserDto)=> {
    const [affectedCounts, affectedRows] = await User.update(data,{
        where : { id },
        returning:true
    })
    if(affectedCounts === 0) throw new Error("Le user n'existe pas")
    let { password, ...others } = affectedRows[0].dataValues
    return others
}
