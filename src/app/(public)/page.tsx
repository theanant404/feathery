"use client"
import { useSession } from "next-auth/react"

export default function Home(){
    const session=useSession()
    console.log(session)
    return(
        <>
        <div>
            <h1>Home</h1>
            <h2>Home</h2>
            <h3>Home</h3>
        </div>


        </>
    )
}