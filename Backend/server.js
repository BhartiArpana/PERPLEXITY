import 'dotenv/config'
import app from './src/app.js'
import connectToDb from './src/config/database.js';
import { testAi } from './src/services/ai.sevices.js';

connectToDb()
testAi()

app.listen(3000,()=>{
    console.log("Server running on port 3000"); 
})