import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string
}

const Users = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },  

    password: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model<IUser>('User', Users)
export default User