import { generateResponse, generateTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from '../models/message.model.js'
import { response } from "express"

export async function sendMessage(req,res){
     const {message,chatId} = req.body
    const user = req.user
    
     let chat ,title
     if(!chatId){
        chat=null,
        title = null
     title = await generateTitle(message)
      chat = await chatModel.create({
        userId:user.id,
        title:title
     })
     }

     const userMessage = await messageModel.create({
         chatId:chatId|| chat._id,
         role:"user",
         content:message
     })
      const messages = await messageModel.find({chatId:chatId || chat._id})

       const result = await generateResponse(messages)

     const aiMessage = await messageModel.create({
        chatId:chatId||chat._id,
        role:"ai",
        content:result
     })



     res.status(200).json({
        title:title,
        chat:chat,
       aiMessage:aiMessage
     })
}


export async function getChats(req,res){
    const user = req.user

    const allChats = await chatModel.find({userId:user.id})
    if(!allChats){
        return res.status(404).json({
            message:"Chat not found!"
        })
    }

    res.status(200).json({
       message:"chat retrieve successfully!",
       allChats
    })
}

export async function getMessage(req,res){
    const user = req.user
    const {chatId} = req.params

    const chat = await chatModel.findOne({
        userId:user.id,
        _id:chatId
    })

    if(!chat){
        return res.status(404).json({
            message:"Chat not found"
        })
    }

    const messages = await messageModel.find({chatId})

    res.status(200).json({
        message:"chat fetched successfully!",
        messages
    })
}

export async function deleteChat(req,res){
    const user = req.user
    const {chatId} = req.params

    const chat =await chatModel.findByIdAndDelete({
        userId:user.id,
        _id:chatId
    })

    if(!chat){
        return res.status(404).json({
            message:'Chat not found'
        })
    }

    await messageModel.deleteMany({chatId})

    res.status(200).json({
        message:"chat deleted successfully!"
    })
}