import {z} from 'zod'

export const usernameValidation=z
    .string()
    .min(2,"UserName must be atLeast 2 characters")
    .max(20,"Username must be no more then 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not cotain spacial character")


export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email address'}),
    passwored:z.string().min(5,{message:"Pasword must be at least 5 char"})
})