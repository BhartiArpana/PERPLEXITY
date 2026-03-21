import { initializeSocketConnection } from "../services/chat.socket";
import {sendMessage,getChats,getMessage,deleteChat} from '../services/chat.api'
import {setChat,setCurrentChatId,setIsLoading,setError} from '../chat.slice'
import { useDispatch } from "react-redux";

export const useChat = ()=>{

    const dispatch = useDispatch()

    async function handleSendMessage({message,chatId}){
      dispatch(setIsLoading(true))
      const data = await sendMessage({message,chatId})
      const {chat,aiMessage} = data
      dispatch(setChat((prev)=>{
        return {
            ...prev,
            [chat._id]:{
                ...chat,
                messages:[{content:message,role:"user"},aiMessage]
            }
        }
      }))
      dispatch(setCurrentChatId(chat._id))
    }

    return {
        initializeSocketConnection,
        handleSendMessage
    }
}