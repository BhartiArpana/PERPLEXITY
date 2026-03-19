import mongoose from "mongoose";

 const messageSchema = new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chats",
        required:[true,'chatId required']
    },
    role:{
        type:String,
        enum:['Ai','user'],
        required:true
        },
    content:String
},{
    timestamps:true
})

const messageModel = mongoose.model('messages',messageSchema)

export default messageModel