import mongoose, { mongo } from "mongoose";

const chatSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userId required"],

    },
    title:{
        type:String,
    }
},{
    timestamps:true
})

const chatModel = mongoose.model('chats',chatSchema)

export default chatModel