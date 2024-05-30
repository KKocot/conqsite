"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data } = useSession();
  return (
    <nav className="flex justify-between items-center bg-slate-900 px-8 py-1">
      <Link className="text-white font-bold flex items-center gap-2" href={"/"}>
        <img src="/logo.png" alt="logo" className="h-10" />
        KoP
      </Link>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={data.user?.image ?? ""}
              alt="user"
              className="h-10 w-10 rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/${data.user.name}`}>Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/form">Formularz</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-700"
              onClick={() => signOut()}
            >
              Wyloguj sie
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => signIn("discord")}>Zaloguj sie</Button>
      )}
    </nav>
  );
}
