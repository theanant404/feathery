import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";
import UserModel from "@/models/User.model";



export async function GET(req:Request) {
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
        const user=await UserModel.aggregate([
            {$sort:{"users.createdAt":-1}}
        ])
        // console.log(user)
        if(!user || user.length==0){
            return Response.json({
                success:false,
                message:"User not Found"
            })
        }
        return Response.json({
            success:true,
            user,
        })
        
    } catch (error:any) {
        return Response.json({
            success:false,
            message:"user not found"
        })
    }
}