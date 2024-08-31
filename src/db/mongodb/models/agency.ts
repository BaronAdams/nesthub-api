import mongoose, { Schema, Document } from "mongoose"
import User from "./user"

// Interface pour le modèle utilisateur
interface IAgency extends Document {
    title: string;
    content: string;
    categories: string[];
    author: mongoose.Types.ObjectId;
    views: number;
    likes: mongoose.Types.ObjectId[];
    coverPic: string;
    comments: IComment[];
    shares: mongoose.Types.ObjectId[];
}

const agencySchema : Schema<IAgency>= new Schema({
    offer:{
        type: String,
        required: true,
    },
    place:{
        type: String,
        required:true,
    },
    imageUrl:{
        type: String,
        default : 'http://localhost:8000/images/blog3.webp'
    },
    experience:{
        type: String,
        required : true
    },
    salary:{
        type: Number,
        default : 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true })


export default mongoose.model('Agency', agencySchema)