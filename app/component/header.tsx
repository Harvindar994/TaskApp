"use client";

import Image from "next/image";
import { Loader2, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "../states/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ThemeToggle } from "./themeToggle";
import { useTasks } from "../states/notes";

const Header = () => {
  const { email, name, avatar, isAvailable, clear, setSession } = useSession();
  const { clearTask } = useTasks();
  const [gettingLogout, setGettingLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/v1/session")
      .then((respose) => {
        if (respose.status == 200) {
          if (email != respose.data.email) {
            const { email, name, avatar } = respose.data;
            setSession(email, name, avatar);
          }
        } else {
          clear();
        }
      })
      .catch(() => {
        clear();
      });
  }, []);

  async function logOut() {
    setGettingLogout(true);
    axios
      .delete("/api/v1/session")
      .then(() => {
        router.push("/auth/login");
        setGettingLogout(false);
      })
      .catch(() => {
        setGettingLogout(false);
      });
  }

  return (
    <div className="pt-[25px] pr-[25px] pb-[0px] pl-[25px] flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/windows11/LargeTile.scale-100.png" // Path to your logo in the 'public' folder
          alt="Logo" // Descriptive alt text
          width={40} // Width of the image
          height={40} // Height of the image
          priority={true} // Optional: prioritize loading for the logo
        />
        <h1 className="font-bold text-lg">Brightgoal</h1>
      </div>
      <div>
        {isAvailable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                {avatar && <AvatarImage src={avatar} />}
                <AvatarFallback>
                  {gettingLogout && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {!gettingLogout && name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 -translate-x-4 translate-y-2">
              <DropdownMenuLabel>
                <div>
                  <p>{name}</p>
                  <p className="text-gray-400 font-normal">{email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>🙋‍♂️</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!isAvailable && <ThemeToggle />}
      </div>
    </div>
  );
};

export default Header;
