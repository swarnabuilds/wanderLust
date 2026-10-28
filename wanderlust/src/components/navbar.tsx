'use client'
import Link from "next/link";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destination", active: false },
  { label: "Add Destinations", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
  { label: "Admin", href: "#", active: false },
];

export function Navbar() {
 
  const { data: session} = authClient.useSession() 
  const user = session?.user
  console.log(user)

  const handelSignOut = () =>{
    authClient.signOut();
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-[#00a8cc]"
                  : "text-gray-600 transition-colors hover:text-gray-900"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="#"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-[#00a8cc]"
        >
          Wanderlast
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <Link href="#" className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
            <User className="size-4" />
            Profile
          </Link>
          
        {
          user ?     <Popover>
          <PopoverTrigger render={<Avatar>
          <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>}>
            
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>{user?.name}</PopoverTitle>
              <PopoverDescription> 
                <p>{user?.email}</p>
                <Button onClick={handelSignOut} variant={'destructive'}>Signout</Button>
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover> :  <><Link href="/login" className="transition-colors hover:text-gray-900">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 rounded-md bg-[#00a8cc] px-4 text-sm font-medium text-white hover:bg-[#0093b3]">
            Sign Up
          </Link></>
        } 

     

          
        </div>
      </nav>
    </header>
  );
}
