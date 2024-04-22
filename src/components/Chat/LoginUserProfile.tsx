"use client"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function LoginUserProfile() {
  const session = useSession()
  return (

    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="shrink-0">
            {(session.status === 'authenticated') && (
              <Avatar className=" mt-5 size-28">
                <AvatarImage src={session.data.user.image!} alt="@shadcn" />
                <AvatarFallback>
                  {session.data.user.fullname!
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}

            <span className="sr-only">Toggle navigation menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="grid gap-2 text-lg font-medium">
            <h1>Profile</h1>
          </div>

        </SheetContent>
      </Sheet>
    </>
  )
}