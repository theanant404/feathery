import { Artical } from "@/components/profile/articel";
import EditProfile from "@/components/profile/editProfile";
import Follower from "@/components/profile/follower";
import Post from "@/components/profile/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";


export default function PublicProfile({ params }: any) {
  return (
    <>
      <div className=" h-52 bg-slate-600">
        <div className="grid grid-cols-3 w-full mx-10 ">
          <div className="items-center">
            <Avatar className=" mt-5 size-40">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-5 min-w-0">
              <h2 className="truncate text-xl font-bold text-gray-200">
                {params.username} helol
              </h2>
            </div>
          </div>
          <div>
            <div className="mt-10">
              <h1>Name</h1>
            </div>
            <div className="grid grid-cols-3 w-full">
              <div>follower</div>
              <div>Following</div>
              <div>Post</div>
            </div>
          </div>
          <div className=" mt-10">
            <Button>Follow</Button>
            <div><EditProfile/></div>
          </div>
        </div>
      </div>
      <div>{params.username}</div>
      
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
            <Post/>
          </TabsContent>
          <TabsContent value="artical">
            <Artical/>
          </TabsContent>
          <TabsContent value="short">
          </TabsContent>
          <TabsContent value="follower"><Follower/></TabsContent>
          </ScrollArea>
          
        </Tabs>
     
    </>
  );
}
