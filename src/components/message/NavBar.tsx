"use client"
import {
    ArrowLeftCircleIcon,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import SidBar from "./SidBar";
import { ScrollArea } from "../ui/scroll-area";
import CHatUserList from "./chat-user-list";
import UserChatNav from "./user-chat-nav";

export default function NavBar() {
  return (
    <>
    <div className="">
      <div className="">
        <header className="flex h-20 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            
           
            <SheetContent side="left" className="flex flex-col">
                <UserChatNav/>
                 <ScrollArea>
                    <CHatUserList/>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className=" flex">
            <span><ArrowLeftCircleIcon/></span>
          <Link className="font-bold" href={"/"}>Back to Home</Link>
          
          </div>
        </header>
      </div>
      </div>
    </>
  );
}
