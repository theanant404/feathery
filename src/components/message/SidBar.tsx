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
import {
  Bell,
  Home,
  LeafIcon,
  LineChart,
  Package,
  Package2,
  Plus,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import AddUsers from "../Chat/AddUser";
import ChatSetting from "../Chat/ChatSetting";
import Notification from "../Chat/Notification";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CHatUserList from "./chat-user-list";
import UserChatNav from "./user-chat-nav";
interface UserData {
  id: string;
  participants: [];
  username: string;
  fullname: string;
  participantsId: string;
  email: string;
}
export default function SidBar() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      '
      <div className="hidden md:block">
        <div className=" grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className=" w-72 border-r bg-muted/40 ">
            <div className="flex  h-full max-h-screen flex-col gap-2">
              <UserChatNav />
              <Separator />
              <CHatUserList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
