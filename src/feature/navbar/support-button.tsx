"use client";

import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";

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
      <img
        className="h-8"
        src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </a>
  );
};

export default SupportButton;
