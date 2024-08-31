import mongoose, { Document, Schema } from 'mongoose';


export interface IBlackListedToken extends Document {
    token: string;
}

const blackListedTokenSchema: Schema<IBlackListedToken> = new Schema(
    {
      token: {
         type: String,
         required: true,
         unique: true,
      }
    }
);

export default mongoose.model<IBlackListedToken>('BlackListedToken', blackListedTokenSchema);