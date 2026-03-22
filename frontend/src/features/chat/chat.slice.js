import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:'chat',
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },
    reducers:{
        createNewChat:(state,action)=>{
            const {chatId,title} = action.payload
            state.chats[chatId] = {
                _id:chatId,
                title,
                message:[],
                lastUpated: new Date().toISOString(),
            }
        },
        addNewMessage:(state,action)=>{
            const {chatId,content,role} = action .payload
            state.chats[chatId].message.push({content,role})
        },
        addMessage:(state,action)=>{
            const {chatId,messages} = action.payload
               if (!state.chats[chatId]) return;
            state.chats[chatId].message.push(...messages)
        },
        setChat:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId=action.payload
        },
        setIsLoading:(state,action)=>{
            state.isLoading= action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {setChat,setCurrentChatId,setIsLoading,setError,createNewChat,addNewMessage,addMessage} = chatSlice.actions
export default chatSlice.reducer