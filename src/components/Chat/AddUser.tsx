"use client";
import Link from "next/link";
import { Button } from "../ui/button";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Plus,
  Search,
} from "lucide-react";

import { ScrollArea } from "../ui/scroll-area";
import { mails } from "@/data/emali";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";


interface UserData {
  id: string;
  username: string;
  fullname: string;
  email: string;
}

export default function AddUsers() {
  const session=useSession()
  const [data, setData] = useState<UserData[]>([]);
  
  // console.log(token)
  const allUser = async () => {
    axios.get("/api/chat/get-all-users"
    ).then((response) => {
      // console.log("Response:", response);
      if (response.statusText === "OK") {
        // console.log("data is :-", response.data.user);
        const users = response.data.user.map(
          (user: { _id: any; username: any; email: any;fullname:any}) => ({
            id: user._id,
            username: user.username,
            email: user.email,
            fullname:user.fullname,
          })
        );

        setData(users);
      }
    });
  };

  const CreateOneOneChat = async (id: string) => {
    
    console.log(id)
    console.log("one one chat created");
    
    
    
    if(session.status==='authenticated'){
      console.log('clickd',id)
      axios.post('/api/chat/create-one-to-one-chat',{userId:id})
      .then((response) => {
        // console.log("Response:", response);
        // console.log(response.)

      })
    }
  };
  // console.log(data)
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            onClick={allUser}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Plus className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="grid gap-2 text-lg font-medium">
            <form className=" flex ">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute  right-5 top-3  text-muted-foreground"
                />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 w-64"
                />
              </div>
            </form>
             <ScrollArea className="h-screen">
            {data ? (
             
                <div className="flex flex-col gap-2 p-4 pt-0">
                  {data.map((item) => (
                    <div className="cursor-pointer" onClick={() => CreateOneOneChat(item.id)}key={item.id}>
                      {/* <Link href={`/inbox/${item.id}`} key={item.id}> */}
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage alt={item.fullname} />
                              <AvatarFallback>
                                {item.fullname
                                  .split(" ")
                                  .map((chunk) => chunk[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-semibold">{item.fullname}</div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                      <Separator className="my-1" />
                    </div>
                  ))}
                </div>
              
            ) : null}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
