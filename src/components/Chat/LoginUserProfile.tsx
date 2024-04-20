"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Home, LineChart, Menu, Package, Package2, ShoppingCart, UserCircle, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginUserProfile(){
  const session=useSession()
    return(

        <>
        <Sheet>
        <SheetTrigger asChild>
          <div className="shrink-0">
            {(session.status==='authenticated'&& session.data.user.image)&&(
              <Image src={session.data.user.image} alt={session.data.user.username||'avtar'} width={128} height={128} className="rounded-full"></Image>
            )}
          
            <span className="sr-only">Toggle navigation menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="grid gap-2 text-lg font-medium">
            <h1>Profile</h1>
          </div>
          
        </SheetContent>
      </Sheet>
        </>
    )
}