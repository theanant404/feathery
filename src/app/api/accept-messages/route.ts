import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import UserModel from "@/models/User.model";




export async function POST(req:Request){
    await dbConnect()
    const session=await getServerSession(authOptions)
    const user:User=session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:'user not Authenticated'
        },{status:404})
    }
    const userId=user._id;
    const {acceptMessage}=await req.json()
    try {
        const updatedUser=await UserModel.findByIdAndUpdate(userId,{isAcceptingMessage:acceptMessage},{new:true})
        if(!updatedUser){
            return Response.json({
                success:false,
                message:'failed to update user status to accept message'
            },{status:401})
        }
        return Response.json({
            success:true,
            message:'Message Acceptance status updated successflly',
            updatedUser
        },{status:200})
    } catch (error:any) {
        console.error("faliled to update user status to accept message")
        return Response.json({
            success:false,
            message:'failed to update user statud to accept message'
        },{status:500})
    }
}



export async function GET(req:Request){
    await dbConnect()
    const session=await getServerSession(authOptions)
    const user:User=session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:'user not Authenticated'
        },{status:404})
    }
    try {
        const userId=user._id;
        const foundUser=await UserModel.findById(userId)
        if(!foundUser){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:404})
        }
        return Response.json({
            success:true,
            isAcceptingMessages:foundUser.isAcceptingMessage
        },{status:200})
    } catch (error:any) {
        console.error('falled to find user',error)
        return Response.json({
            
            success:false,
            message:'Error in gating message acceptance status'
        },{status:500})
    }

}