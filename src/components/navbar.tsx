"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./theme-menu";
import { useTranslations } from "next-intl";
import LanguageToggle from "./language-toggle";

export default function Navbar() {
  const t = useTranslations("HomePage");
  const { data } = useSession();
  return (
    <nav className="flex justify-between items-center bg-primary px-8 py-1">
      <Link className="text-white font-bold flex items-center gap-2" href={"/"}>
        <img src="/logo.png" alt="logo" className="h-10" />
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/policy" className="text-white">
          Privacy Policy
        </Link>
        <Link href="/tos" className="text-white">
          Terms of Service
        </Link>
        <Link href="/docs" className="text-white">
          Documentation
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
              <DropdownMenuItem
                className="cursor-pointer text-red-700"
                onClick={() => signOut()}
              >
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
        <ModeToggle />
        <LanguageToggle />
      </div>
    </nav>
  );
}
