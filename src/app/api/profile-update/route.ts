import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";









export async function POST(req:Request) {
    
    const user=await req.json()
    const session =await getServerSession(authOptions)
    if(session?.user.email===user.useremail){
        await dbConnect()
        const User=await UserModel.findOne({email:user.useremail})
      
        if(User){
            User.username=user.data.username;
            User.fullname=user.data.fullname;
            User.bio=user.data.bio;
            User.image=user.urlsAndPublicIds;
            const saveUser=await User?.save()
            console.log(saveUser)
        }
        
        
    }
    // console.log('session',session)
    console.log('request********',user.useremail)
    return Response.json({
        success:true,
        message:"profile updated"
    })
}