import {resend} from '@/lib/resend'

import { ApiResponse } from '@/types/ApiResponse'
import VerificationOnEmail from '../../emails/varificationsEmail'

export async function sendVreificationEmail(
    email:string,
    fullname:string,
    verifyCode:string,
):Promise<ApiResponse>{
    try {
        const emailsendd=await resend.emails.send({
            from:'onboarding@resend.dev',
            to:email,
            subject:'Verification code',
            react:VerificationOnEmail({fullname,otp:verifyCode})
        })
        console.log(emailsendd)
        return{success:true,message:"verification email send successfully"}
    } catch (error:any) {
        console.error("Error during sending verification email",error)
        return{success:false,message:"Failed to send verification email"}
    }
}