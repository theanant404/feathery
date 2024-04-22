"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
interface UserData {
  id: string;
  content: string;
  participantsId: string;
}
export default function ChatRoom({ params }: any) {
  const [messagedata, setMessageData] = useState<UserData[]>([]);
  const [message, setMessage] = React.useState({
    content: "",
  });
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }
  if (!session) return null;
  const id: string = params.chatroom;
  // api call
  useEffect(() => {
    if (session.status === "authenticated") {
      console.log("clickd", id);
      axios
        .get(`/api/chat/get-all-messages?chatroomid=${id}`)
        .then((response) => {
          console.log("response", response);
          console.log("Response:", response.data.messages);
          const Messages = response.data.messages.map(
            (Messages: { chat: any; sender: any; content: any }) => ({
              id: Messages.chat,
              content: Messages.content,
              participantsId: Messages.sender._id,
            })
          );
          setMessageData(Messages);
        });
    }
  }, []);
  console.log("message data is:-", messagedata);

  // send message

  const semdMessage = async (id: any) => {
    console.log("message is:-", message);

    if (session.status === "authenticated") {
      console.log("clickd from send message id", id);
      axios
        .post(`/api/chat/send-message`, { chatroomId: id, message })
        .then((response) => {
          console.log("Response:", response);
        });
    }
  };
  return (
    <>
      <div className=" grid min-h-screen ">
        <div className=" w-full border-r bg-muted/40 ">
          <div className="flex  h-full w-full max-h-screen flex-col gap-2">
            <div className="h-14 mt-0 bg-stone-300 items-center">
              <div className="flex items-center gap-3 mx-7">
                <Avatar className="size-20">
                  <AvatarImage
                    src={session.data?.user.image!}
                    alt={session.data?.user.username}
                  />
                  <AvatarFallback>
                    {session?.data?.user
                      ?.fullname!.split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold">{session.data?.user.fullname}</span>
              </div>
            </div>
            <ScrollArea className="">
              <div className="p-10">
                {messagedata ? (
                  <>
                    {messagedata.map((item) => (
                      <>
                        <div key={item.id}>
                          <div>
                            {session.data?.user._id === item.participantsId && (
                              <div className=" bg-red-400 w-28 text-right p-1">
                                {item.content}
                              </div>
                            )}
                          </div>

                          <Separator />
                          <div>
                            {session.data?.user._id !== item.participantsId && (
                              <div className="bg-stone-600 w-28 text-left">
                                {item.content}
                              </div>
                              
                            )}
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div>No Message Foud</div>
                  </>
                )}
              </div>
            </ScrollArea>
            <div className="flex-1" />
            <div
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                value={message.content}
                onChange={(e) =>
                  setMessage({ ...message, content: e.target.value })
                }
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* {params.chatroom} */}
                <Button
                  onClick={() => semdMessage(params.chatroom)}
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                >
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
