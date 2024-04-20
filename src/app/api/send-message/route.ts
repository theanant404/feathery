import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";

export async function POST(req:Request){
    await dbConnect()
    const {username,content}=await req.json()

    try {
        const user=await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message:'User not Found'
            },{status:404})
        }
        // is user accepting message 
        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:'User is not accpting the message'
            },{status:403})
        }
        const newMessage={content,creadedAt:new Date()}
        user.message.push(newMessage as unknown  as Message)
        await user.save()
        return Response.json({
            success:true,
            message:'message sent successfully'
        },{status:200})
    } catch (error:any) {
        console.error('unexpacted error during sending message',error)
        return Response.json({
            success:false,
            message:'errror during send message'
        },{status:500})
    }
}