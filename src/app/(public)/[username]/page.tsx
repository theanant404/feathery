"use client";
import { Artical } from "@/components/profile/articel";
import EditProfile from "@/components/profile/editProfile";
import Follower from "@/components/profile/follower";
import Post from "@/components/profile/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicProfile({ params }: any) {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            </CardHeader>
            <CardContent>
              <Avatar className="size-28">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Name the anant</span>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Tabs defaultValue="post" className="">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="post">
            Post
            {/* <Link href={`/${params.username}/post`}>Post</Link> */}
          </TabsTrigger>
          <TabsTrigger value="artical">
            {" "}
            {/* <Link href={`/${params.username}/artical`}>Artical</Link> */}
            Artical
          </TabsTrigger>
          <TabsTrigger value="short">
            {/* <Link href={`/${params.username}/short`}>Short</Link> */}
            Short
          </TabsTrigger>
          <TabsTrigger value="follower">
            {/* <Link href={`/${params.username}/follower`}>Follower</Link> */}
            Follower
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[570px]">
          <TabsContent value="post">
            <Post />
          </TabsContent>
          <TabsContent value="artical">
            <Artical />
          </TabsContent>
          <TabsContent value="short"></TabsContent>
          <TabsContent value="follower">
            <Follower />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  );
}
