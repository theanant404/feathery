"use client"
import NavBar from "@/components/Chat/NacBar";
import {mails} from '@/data/emali'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function MessageId({ params }: any){

    return(
        <>
        <div className="ml-72 ">
            <div>
                <NavBar userId={params.id} />
            </div>
            <div className="overflow-y-auto">
                {/* {params.id} */}
            </div>
            
        </div>
        
        </>
    )
}