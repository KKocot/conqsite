"use client";

import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import Image from "next/image";

const SupportButton = () => {
  const { open } = useSidebar();
  return (
    <a
      href="https://ko-fi.com/K3K713SMAY"
      target="_blank"
      className={clsx("self-center", {
        hidden: !open,
      })}
    >
      <Image
        height={32}
        width={150}
        style={{ height: "auto", width: "auto" }}
        src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
        alt="Buy Me a Coffee at ko-fi.com"
        priority
      />
    </a>
  );
};

export default SupportButton;
