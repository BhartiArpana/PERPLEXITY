import 'dotenv/config'
import app from './src/app.js'
import connectToDb from './src/config/database.js';
import { testAi } from './src/services/ai.sevices.js';
import http from 'http'
import { initSocket } from './src/sockets/server.socket.js';

connectToDb()
testAi()
const httpServer = http.createServer(app)
initSocket(httpServer)

httpServer.listen(3000,()=>{
    console.log("Server running on port 3000"); 
})