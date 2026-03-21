import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export const sendMessage = async({message,chatId})=>{
    const response = await api.post('/api/chats/message',{message,chatId})
    return sendMessage
}

export const getChats = async()=>{
    const response = await api.get('/api/chats')
    return getChats
}

export const getMessage = async(chatId)=>{
    const response = await api.get(`/api/chats/:${chatId}/message`,chatId)
    return getMessage
}

export const deleteChat = async(chatId)=>{
    const response = await api.delete(`/api/chats/delete/:${chatId}`)
    return deleteChat
}