import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { use } from "react";


export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any>{
                const email = credentials?.email;
                const password = credentials?.password;
                // console.log(email,password)
                await dbConnect()
                try {
                    const user= await UserModel.findOne({
                        $or:[
                            {email:credentials.email},
                            {username:credentials.email}
                        ]
                    })
                    // console.log('user login',user)
                    if(!user){
                        // throw new Error('No user found with this email')
                        return user;
                    }
                    if(!user.isVerified){
                        throw new Error("Please vefify your account berore login")
                        // send new verification email 
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error('Incorrect Password')
                    }
                } catch (error:any) {
                    throw new Error(error)
                }
              }
        })
    ],
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.SECRET,
    callbacks:{
        async jwt({ token, user}) {
            if(user){
                token._id=user._id?.toString()
                token.isVerified=user.isVerified;
                token.isAcceptingMessages=user.isAccpetingMessages;
                token.username=user.username
                token.fullname=user.fullname
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id
                session.user.isVerified=token.isVerified
                session.user.isAccpetingMessages=token.isAccpetingMessages
                session.user.username=token.username
                session.user.fullname=token.fullname
            }
            return session
        }
        
    }
}