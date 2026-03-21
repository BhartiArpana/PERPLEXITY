import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import {sendMessage,getChats,getMessage,deleteChat} from '../controllers/chat.controller.js'

const chatRouter = Router()

chatRouter.post('/message',userAuth,sendMessage)

chatRouter.get('/',userAuth,getChats)

chatRouter.get('/:chatId/messages',userAuth,getMessage)

chatRouter.delete('/delete/:chatId',userAuth,deleteChat)

export default chatRouter