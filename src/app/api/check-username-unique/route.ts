import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";
const UserNameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(req:Request){
    await dbConnect()
    try {
        const {searchParams} =new URL(req.url)
        const queryParam={
            username:searchParams.get('username')
        }
        // validate with zod
        const result=UserNameQuerySchema.safeParse(queryParam)
        // console.log(result)
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors ||[]
            return Response.json({
                message:usernameErrors?.length>0?usernameErrors.join(', '):'Invalid Query Parameters',
                success:false
            },{status:400})
        }
        const {username}=result.data
        const existingVerifiedUser=await UserModel.findOne({username,isVerified:true})
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:'Username is alread taken'
            },{status:400})
        }
        return Response.json({
            success:true,
            message:'Username is avlable'
        },{status:201})
    } catch (error:any) {
        console.error("Error during chacking username ",error)
        return Response.json({
            success:false,
            message:"Error during checking user name"
        },{status:500})
    }
}