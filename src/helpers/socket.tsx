"use client";
import React, { useEffect, useState } from "react";
import style from "./chat.module.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import * as z from "zod";
interface IMsgDataTypes {
  id: string;
  content: string;
  participantsId: string;
  fullname: string;
  time: string;
}
interface UserData {
  id: string;
  content: string;
  participantsId: string;
  fullname: string;
  time: string;
}

const ChatPage = ({ socket, username, roomId }: any) => {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }
  const [messagedata, setMessageData] = useState<UserData[]>([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  // connection sockit io


  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      constent: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    const msgData: IMsgDataTypes = {
      id: roomId,
      participantsId: username,
      content: data.constent,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      fullname: session.data?.user.fullname!,
    };
    //   await socket.emit("join_room",roomId);
    await socket.emit("send_msg", msgData);
    console.log("start sendign request");
    axios
      .post(`/api/chat/send-message`, { chatroomId: roomId, msgData })
      .then((response) => {
        // console.log("Response:", response);
      });
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      // console.log("saving message in user state start");
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  useEffect(() => {
    // console.log('line 39 ')
    if (session.status === "authenticated") {
      console.log("clickd", roomId);
      axios
        .get(`/api/chat/get-all-messages?chatroomid=${roomId}`)
        .then((response) => {
          // console.log("response get all message ", response);
          // console.log("Response:", response.data.participate);
          const participatedetail = response.data.participate.map(
            (participatedetail: {
              imag: any;
              fullname: string;
              username: string;
            }) => ({})
          );
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
  }, [roomId]);
  console.log('sendind chat data ',chat)
  return (
    <>
      <ScrollArea className="">
        <div className="p-10">
          {messagedata || chat ? (
            <>
              {messagedata.map((item) => (
                <>
                  <div key={item.id}>
                    <div>
                      {session.data?.user._id === item.participantsId && (
                        <div className="  text-right p-1">{item.content}</div>
                      )}
                    </div>

                    <Separator />
                    <div>
                      {session.data?.user._id !== item.participantsId && (
                        <div className=" text-left">{item.content}</div>
                      )}
                    </div>
                  </div>
                </>
              ))}
              {chat.map((item) => (
                <>
                  <div key={item.id}>
                    <div>
                      {session.data?.user._id === item.participantsId && (
                        <div className="  text-right p-1">{item.content}</div>
                      )}
                    </div>

                    <Separator />
                    <div>
                      {session.data?.user._id !== item.participantsId && (
                        <div className=" text-left">{item.content}</div>
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
      <Form {...form}>
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="constent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <>
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
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </>
        </form>
      </Form>

      {/* <div className={style.chat_div}>
                <div className={style.chat_border}>
                    <div style={{ marginBottom: "1rem" }}>
                        <p>
                            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
                        </p>
                    </div>
                    <div>
                        {chat.map(({ roomId, user, msg, time }, key) => (
                            <div
                                key={key}
                                className={
                                    user == username
                                        ? style.chatProfileRight
                                        : style.chatProfileLeft
                                }
                            >
                                <span
                                    className={style.chatProfileSpan}
                                    style={{ textAlign: user == username ? "right" : "left" }}
                                >
                                    {user.charAt(0)}
                                </span>
                                <h3 style={{ textAlign: user == username ? "right" : "left" }}>
                                    {msg}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div>
                        <form onSubmit={(e) => sendData(e)}>
                            <input
                                className={style.chat_input}
                                type="text"
                                value={currentMsg}
                                placeholder="Type your message.."
                                onChange={(e) => setCurrentMsg(e.target.value)}
                            />
                            <button className={style.chat_button}>Send</button>
                        </form>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default ChatPage;
