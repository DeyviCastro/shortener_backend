import mongoose from "mongoose";

type ILink = {
    originalUrl: string,
    slug: string,
    user: string
    clicks: number
}

const Links = new mongoose.Schema({
    
    originalUrl:{
        type: String,
        trim: true,
        required: true
    },

    slug: {
        type: String,
        trim: true,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clicks: {
        type : Number,
        default: 0
    }

}, {
    timestamps: true
})

const Link = mongoose.model<ILink>('Link', Links)
export default Link