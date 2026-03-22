import { ChatMistralAI, MistralAI } from "@langchain/mistralai";
import {AIMessage, createAgent, HumanMessage,SystemMessage, tool} from 'langchain'
import * as z from 'zod'
import {searchInternet} from './internet.services.js'


const model = new ChatMistralAI({
model: "mistral-small-latest",
apiKey:process.env.MISTRAL_API_KEY
});

const searchInternetTool = tool(
    searchInternet,
    {
        name:"searchInternet",
        description:"Use this tool to get the latest information from the internet.",
        schema:z.object({
            Query:z.string().describe("The search query to look up on internet. ")
        })
    }
)

const agent = createAgent({
    model:model,
    tools:[searchInternetTool]
})

export async function generateResponse(messages){
    console.log(messages);
   console.log("Full Message Object:", JSON.stringify(messages, null, 2))
    
    const response = await agent.invoke({
        messages:messages.map((msg)=>{
        if(msg.role == 'user'){
            return new HumanMessage(msg.content)
        }
        else if(msg.role == 'ai'){
            return new AIMessage(msg.content)
        }
    })
    })

    return response.messages[response.messages.length-1].text
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