"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { LeafIcon } from "lucide-react";
import AddUsers from "../Chat/AddUser";
import ChatSetting from "../Chat/ChatSetting";
import Notification from "../Chat/Notification";
import UserChatNav from "./user-chat-nav";
interface UserData {
  id: string;
  participants: [];
  username: string;
  fullname: string;
  participantsId: string;
  email: string;
}
export default function CHatUserList() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  const [data, setData] = useState<UserData[]>([]);
  useEffect(() => {
    axios.get("/api/chat/get-chat-room-user").then((response) => {
    //   console.log("Response:", response);
      if (response.statusText === "OK") {
        // console.log("data is :-", response.data.user);
        const users = response.data.user.map(
          (user: {
            _id: any;
            participants: any;
            participantsId: any;
            email: any;
            fullname: any;
          }) => ({
            id: user._id,
            fullname: user.participants[0].fullname,
            participantsId: user.participants[0]._id,
          })
        );

        setData(users);
      }
    });
  }, []);
  return (
    <>
      <ScrollArea>
        {data ? (
          <div className="flex flex-col gap-2 p-4 pt-0">
            {data.map((item) => (
              <div key={item.id}>
                <Link href={`/message/${item.id}`} key={item.id}>
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
                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          0
                        </Badge>

                        {/* {!item.read && (
                            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                          )} */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="line-clamp-2 text-xs text-muted-foreground">
                      {item.text.substring(0, 30)}....
                    </div> */}
                </Link>
                <Separator className="my-1" />
              </div>
            ))}
          </div>
        ) : (
          "user not found"
        )}
      </ScrollArea>
    </>
  );
}
