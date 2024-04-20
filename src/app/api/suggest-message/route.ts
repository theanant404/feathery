import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {
    const prompt="Create a list of theree open-ended and engaging question formatted as a single string. Each question should be separated by '||'. These question are for an anonymous social messaging platform,like Qooh.me, and should be suitable for a diverse audience. Avoide personal or sensitive topic,foucsing instead on universal thems thst encourage friendly interaction. For example,Your output should be structures like this: What's a hobby you've recentky staarted?||If you couls have diner with any historical figure, who would it be?||question are intriguing, foster curiosity, and contribute to a positive and wrlcoming conversational enviroment."
    const { messages } = await req.json();
   
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      max_tokens:400,
      stream: true,
      prompt,
    });
   
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    if(error instanceof OpenAI.APIError){
        const {name,status,headers,message}=error
        return NextResponse.json({
            name,status,headers,message
        },{status:})
    }else{
        console.error("An Unexpected error occured",error)
        throw error
    }
  }
}