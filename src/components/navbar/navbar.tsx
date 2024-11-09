"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-menu";
import LanguageToggle from "./language-toggle";
import Image from "next/image";

import { ProfileMenu } from "./profile-menu";
import { ProtectedLinks } from "./protected-links";

export default function Navbar() {
  return (
    <nav className="flex items-center border-b-2 border-accent backdrop-blur px-8 py-1 sticky top-0 z-10">
      <Link className="size-10 relative" href={"/"}>
        <Image src="/logo.png" alt="logo" fill />
      </Link>
      <ProtectedLinks />
      <div className="flex items-center gap-2 ml-auto text-sm">
        <a href="https://ko-fi.com/K3K713SMAY" target="_blank">
          <Image
            height={32}
            width={120}
            style={{ borderRadius: "9999px", fontSize: "0.875rem" }}
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
        <ProfileMenu />
        <ModeToggle />
        <LanguageToggle />
      </div>
    </nav>
  );
}
