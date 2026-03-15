import { initChatModel } from "langchain";

process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

const model = await initChatModel("google-genai:gemini-2.5-flash-lite");

export async function testAi(req,res){
    model.invoke("What is the capital of India?").then((response) => {
        console.log(response.text);
        
    })
}