"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Plus,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { mails } from "@/data/emali";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import axios from "axios";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Cookies from 'js-cookie';
// import { headers } from "next/headers";
interface UserData {
  id: string;
  username: string;
  name: string;
  email: string;
}

export default function AddUsers() {
  const [data, setData] = useState<UserData[]>([]);
  const token = Cookies.get('token');
  const apiResponseString = localStorage.getItem('apiResponse');
  console.log('api response is:-',apiResponseString)
  // console.log(token)
  const headers = {
    'Authorization': `Bearer ${apiResponseString}`,
    'Content-Type': 'application/json' // Adjust content type if necessary
  };
  const allUser = async () => {
    axios.get("http://localhost:3000/chat/users",{ headers }
    
    ).then((response) => {
      console.log("Response:", response);
      if (response.statusText === "OK") {
        console.log("data is :-", response.data);
        const users = response.data.data.map(
          (user: { _id: any; username: any; email: any }) => ({
            id: user._id,
            username: user.username,
            email: user.email,
          })
        );

        setData(users);
      }
    });
  };
  const CreateOneOneChat = async () => {
    console.log("one one chat created");
    // if(session.status==='authenticated'){
    //   axios.get('/api/chat/createoneonechat',{
    //     params: {
    //       userId:session.data.user._id
    //     }
    //   })
    //   .then((response) => {
    //     console.log("Response:", response);

    //   })
    // }
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
            {data ? (
              <ScrollArea className="w-72 h-[70%]">
                <div className="flex flex-col gap-2 p-4 pt-0">
                  {data.map((item) => (
                    <div onClick={CreateOneOneChat} key={item.id}>
                      {/* <Link href={`/inbox/${item.id}`} key={item.id}> */}
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage alt={item.name} />
                              <AvatarFallback>
                                {item.name
                                  .split(" ")
                                  .map((chunk) => chunk[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-semibold">{item.name}</div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                      <Separator className="my-1" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
