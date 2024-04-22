"ise client"
import { LeafIcon } from "lucide-react";
import Link from "next/link";
import AddUsers from "../Chat/AddUser";
import ChatSetting from "../Chat/ChatSetting";
import Notification from "../Chat/Notification";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserChatNav(){
    const router = useRouter();
  const session = useSession();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
    return(
        <>
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LeafIcon className="h-6 w-6" />
          <span className="">Name</span>
        </Link>
        <AddUsers />
        <ChatSetting />
        <Notification/>
      </div>
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
        </>
    )
}