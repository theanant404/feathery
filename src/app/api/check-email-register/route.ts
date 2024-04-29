import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from 'zod'
import { emailValidation } from "@/schemas/signInSchema";
const emailQuerySchema=z.object({
    email:emailValidation
})

export async function GET(req:Request){
    await dbConnect()
    try {
        const {searchParams} =new URL(req.url)
        const queryParam={
            email:searchParams.get('email')
        }
        // validate with zod
        const result=emailQuerySchema.safeParse(queryParam)
        // console.log(result)
        if(!result.success){
            const emailErrors=result.error.format().email?._errors ||[]
            return Response.json({
                message:emailErrors?.length>0?emailErrors.join(', '):'Invalid Query Parameters',
                success:false
            },{status:400})
        }
        const {email}=result.data
        const existingVerifiedUser=await UserModel.findOne({email,isVerified:true})
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:'email is Valid'
            },{status:400})
        }
        return Response.json({
            success:true,
            message:'email is not register go to sign-up page first'
        },{status:201})
    } catch (error:any) {
        console.error("Error during chacking email ",error)
        return Response.json({
            success:false,
            message:"Error during checking Email Please Try Again"
        },{status:500})
    }
}