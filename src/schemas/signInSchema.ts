import {z} from 'zod'

export const emailValidation=z.string().email({message:"invalid email address"})
export const signInSchema=z.object({
    email:emailValidation,
    password:z.string(),
})
