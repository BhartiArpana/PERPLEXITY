import { initializeSocketConnection } from "../services/chat.socket";
import {sendMessage,getChats,getMessage,deleteChat} from '../services/chat.api'
import {setChat,setCurrentChatId,setIsLoading,setError,createNewChat,addNewMessage, addMessage} from '../chat.slice'
import { useDispatch } from "react-redux";

export const useChat = ()=>{

    const dispatch = useDispatch()

    async function handleSendMessage({message,chatId}){
      dispatch(setIsLoading(true))
      const data = await sendMessage({message,chatId})
   if (!data || !data.chat) {
        console.error("Backend se sahi data nahi aaya:", data);
        return;
      }
      
      const {chat,aiMessage} = data
      dispatch(createNewChat({
        chatId:chat._id,
        title:chat.title,
      }))
      dispatch(addNewMessage({
        chatId:chat._id,
        content:message,
        role:"user"
      }))
      dispatch(addNewMessage({
        chatId:chat._id,
        content:aiMessage.content,
        role:aiMessage.role
      }))
      dispatch(setCurrentChatId(chat._id))
    }

    async function handleGetChats(){
        dispatch(setIsLoading(true))
        const data = await getChats()
        const {allChats} = data
        dispatch(setChat(allChats.reduce((acc,chat)=>{
            acc[chat._id] = {
                _id:chat._id,
                title:chat.title,
                message:[],
                lastUpdate:chat.updatedAt,
            }
            return acc
        },{})))
    }

    async function handleOpenChat(chatId){
      const data = await getMessage(chatId)
      const {messages} = data

      const formattedMessage = messages.map(msg=>({
        content:msg.content,
        role:msg.role,
      }))
      dispatch(addMessage({
        chatId,
        messages:formattedMessage,
      }))
      dispatch(setCurrentChatId(chatId))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}