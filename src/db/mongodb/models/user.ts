import mongoose, { Document, Schema } from 'mongoose';

// Interface pour le modèle utilisateur
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    profilePic?: string;
    profession?: string;
}

// Schéma de l'utilisateur
const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 5,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePic: {
            type: String,
        },
        profession: {
            type: String,
        },
    },
    { timestamps: true }
);

// Modèle de l'utilisateur
export default mongoose.model<IUser>('User', userSchema);

