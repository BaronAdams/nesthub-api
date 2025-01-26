import User from "./user.model";
import { getAdminByEmail } from "../admin/admin.service";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
import { UpdateUserDto } from "../auth/dto/update-user.dto";
 
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

export const createManyUsers = async(data: RegisterUserDto[]) : Promise<void> => {
    try {
        const newUsers = await User.bulkCreate(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const isAdmin = await getAdminByEmail(data[i].email)
            if(isAdmin) {
                newUsers[i].update({role:'admin'})
                console.log("New admin confirmed")
            }
        }
    } catch (error) {
        throw new Error("Une erreur est survenue lors de la création d'un utilisateur")
    }
}

export const updateUser = async(id:string, data: UpdateUserDto)=> {
    const user = await User.findByPk(id)
    if(!user) throw new Error("Le user n'existe pas")
    let newData : any = data
    if(data.birthday){
        newData = { ...data, birthday:new Date(data.birthday) }
    }
    let { scores, ...otherValues } = newData
    let storedScores = user.scores
    if(scores){
        for (const k1 of Object.keys(scores)) {
            for (const k2 of Object.keys(scores[k1])) {
              if(storedScores[k1][k2]){
                storedScores[k1][k2] = storedScores[k1][k2] + scores[k1][k2]
              }else{
                storedScores[k1][k2] = scores[k1][k2]
              }
            }
        }
        console.log(storedScores)
        // user.update({scores: storedScores})
        await User.update({scores: storedScores},{
            where : { id }
        })
    }

    
    if(Object.keys(otherValues)){
        // @ts-ignore
        user.update({...otherValues, updatedAt: new Date()})
    }
    
}

export const updateOnlyUser = async(id:string, data: UpdateUserDto)=> {
    let newData : any = data
    if(data.birthday){
        newData = { ...data, birthday:new Date(data.birthday) }
    }
    const [affectedCounts, affectedRows] = await User.update({...newData, updatedAt:new Date()},{
        where : { id },
        returning:true
    })
    if(affectedCounts === 0) throw new Error("Le user n'existe pas")
    return affectedRows[0]
}
