"use client";
import { CircleUser, LeafyGreen, LightbulbIcon, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function NavBar() {
  const session = useSession();
  // console.log(session.status);
  
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <LeafyGreen className="h-6 w-6" />
            <span className="sr-only">Logo</span>
          </Link>
          {session.status === "unauthenticated" && (
            <>
              <Link
                href="/"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/sign-in"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Register
              </Link>
            </>
          )}
          {session.status === "authenticated" && (
            <>
              <Link
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </>
          )}
        </nav>
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
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <LeafyGreen className="h-6 w-6" />
                <span className="sr-only">Feathery</span>
              </Link>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              {session.status === "unauthenticated" && (
                <Link
                  href="sign-in"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
              )}
              {session.status === "unauthenticated" && (
                <Link
                  href="sign-up"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Create an Account
                </Link>
              )}
              {session.status === "authenticated" && (
                <>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Analytics
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                
                {session.status==='unauthenticated'&&(
                  <CircleUser className="h-5 w-5" />
                )}
                {session.status==='authenticated'&&(
                  <>
                  {session.data.user.image?.length==0?(
                    <Avatar>
                    <AvatarImage alt={session.data.user.username} />
                    <AvatarFallback>
                      {session.data.user.fullname!
                        .split(" ")
                        .map((chunk) => chunk[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  ):(
                    <>
                    <Avatar>
                      <AvatarImage alt={session.data.user.image!}></AvatarImage>
                    </Avatar>
                    </>
                  )}
                  </>
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session.status === "unauthenticated" && (
                <>
                  <DropdownMenuItem><Link href={'/sign-in'}>Login</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={'/sign-up'}>Register</Link></DropdownMenuItem>
                </>
              )}
              {session.status === "authenticated" && (
                <>
                  <DropdownMenuItem><Link href={`/${session.data.user.username}`}>Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <LightbulbIcon className="h-6 w-6"/>
        </div>
      </header>
    </>
  );
}
