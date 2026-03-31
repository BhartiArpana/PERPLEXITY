import axios from "axios";

const api = axios.create({
    baseURL:'import.meta.env.VITE_API_URL',
    withCredentials:true
})

export const sendMessage = async({message,chatId})=>{
    const response = await api.post('/api/chats/message',{message,chatId})
    return response.data
}

export const getChats = async()=>{
    const response = await api.get('/api/chats')
    return response.data
}

export const getMessage = async(chatId)=>{
    const response = await api.get(`/api/chats/${chatId}/messages`,chatId)
    return response.data
}

export const deleteChat = async(chatId)=>{
    const response = await api.delete(`/api/chats/delete/:${chatId}`)
    return response.data
}