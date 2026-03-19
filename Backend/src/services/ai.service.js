import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage,SystemMessage} from 'langchain'

const model = new ChatMistralAI({
model: "mistral-small-latest",
apikey:process.env.MISTRAL_API_KEY
});

export async function generateResponse(messages){
    const response = model.invoke(messages.map((msg)=>{
        if(msg.role == 'user'){
            return new HumanMessage(msg.content)
        }
        else if(msg.role == 'Ai'){
            return new HumanMessage(msg.content)
        }
    }))

    return (await response).content
}

export async function generateTitle(message){
    const response = model.invoke([
        new SystemMessage(`Role Chat Title Creator
Task Create a title for the provided message
Rule Use exactly 2 to 3 words
Rule Output only the title text
Rule No introductory words or symbols
Rule No punctuation at the end
Example Input Help me connect my MongoDB to Node.js
Example Output Connecting MongoDB To Node Server  `),
 new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `)
    ])
    return (await response).content
}