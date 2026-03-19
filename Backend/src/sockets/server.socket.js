import { Server, Socket } from "socket.io";

let io

export async function initSocket(httpserver){
    io = new Server(httpserver,{
        cors:{
            origin:'http://localhost:5173',
            credentials:true
        }
    })

    console.log('socket.io server is running... ');
    
    io.on("connection",(socket)=>{
          console.log("A connected user ",socket.id);
          
    })
}

export function getIo(){
    if(!io){
        throw new Error("socket io not initialized.")
    }
    return io
}