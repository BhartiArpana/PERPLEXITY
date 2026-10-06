import { io } from "socket.io-client";

export const initializeSocketConnection = ()=>{
    const socket = io(import.meta.env.VITE_BACKEND_URL,{
        withCredentials:true
    })

    socket.on("connect",()=>{
        console.log("connected to socket.Io server ");
        
    })
}