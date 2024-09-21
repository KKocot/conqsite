"use client";

import Link from "next/link";

import { ModeToggle } from "./theme-menu";
import LanguageToggle from "./language-toggle";
import Image from "next/image";

import { ProfileMenu } from "./profile-menu";
import { ProtectedLinks } from "./protected-links";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-primary px-8 py-1">
      <Link className="text-white font-bold flex items-center gap-2" href={"/"}>
        <div className="size-10 relative">
          <Image src="/logo.png" alt="logo" fill />
        </div>
      </Link>
      <ProtectedLinks />
      <div className="flex items-center gap-2 ml-auto">
        <ProfileMenu />
        <ModeToggle />
        <LanguageToggle />
      </div>
    </nav>
  );
}
