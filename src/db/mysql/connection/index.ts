import relations from '../associations'
import sequelize from '../config'
import ContactMessageModel from '../models/contactmessage'
import Subscription from '../models/subscription'
import User from '../models/user'
import bcrypt from 'bcrypt'
import { createUser } from '../services/user'
import Admin from '../models/admin'

export default async() => {
	 try {
        relations()
        const hashPassword = await bcrypt.hash("S3cr3T!", 10)
        const ContactMessage = ContactMessageModel
        await sequelize.sync()
        // await Admin.create({
        //     email:'johndoe@gmail.com'
        // })
        // await createUser({
        //     name: "John Doe", 
        //     email: "johndoe@gmail.com",
        //     password: hashPassword,
        //     role:"buyer"
        // })
        // await createUser({
        //     name: "Jeremiah Allison", 
        //     email: "allisonjeremia@gmail.com",
        //     password: hashPassword,
        //     role:"buyer"
        // })
        // await createUser({
        //     name: "Jay Kennedy", 
        //     email: "kennjay@mail.co",
        //     password: hashPassword,
        //     role:"seller"
        // })
        // await createUser({
        //     name: "Jordan Hodges", 
        //     email: "jordanhodges@yahoo.com",
        //     password: hashPassword,
        //     role:"both"
        // })
        // await Subscription.bulkCreate([
        //     { name: 'Basic Plan', price: 100.0, agentLimit: 3, propertyLimit: 5 },
        //     { name: 'Standard Plan', price: 250.0, agentLimit: 5, propertyLimit: 12 },
        //     { name: 'Premium Plan', price: 500.0, agentLimit: 100 , propertyLimit: 300 },
        // ]);
        console.log('All tables have been created(loaded) successfully')
     }catch(error){
         console.log('Error : Tables have failed to be created',error)
     }
}