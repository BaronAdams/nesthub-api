import User from "@/db/mongodb/models/user";
import { registerUserDto } from "@/dto/auth";

export const getUserById = async(id:string) => await User.findById(id)    
export const getUserByEmail = async(email:string)=> await User.findOne({ email:email })
export const createUser = async( data: registerUserDto )=>{
    const user = new User(data)
    await user.save()
}