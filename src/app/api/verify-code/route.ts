import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";


export async function POST(req:Request){
    await dbConnect()
    try {
        const {username,code}=await req.json()
        const decodedUsername=decodeURIComponent(username)
        const user=await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:'User not found'
            },{status:500})
        }
        const isCodeValid=user.verifyCode===code;
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date()
        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true
            const verifieduser=await user.save()
            return Response.json({
                success:true,
                message:'Account verified successfully'
            },{status:200})
        }else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:'verification code is expired, please signup again to get new code'
            },{status:400})
        }else{
            return Response.json({
                success:false,
                message:'Invalid verificatio code'
            },{status:400})
        }
    } catch (error:any) {
        console.error("Error checking otp",error)
        return Response.json({
            success:false,
            message:'Error during verificatio otp'
        },{status:500})
    }
}