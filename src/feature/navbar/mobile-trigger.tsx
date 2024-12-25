"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";

const MobileTrigger = () => {
  const { isMobile } = useSidebar();
  return (
    <div className="fixed top-0 left-0 z-20">
      <SidebarTrigger
        className={clsx({
          hidden: !isMobile,
        })}
      />
    </div>
  );
};

export default MobileTrigger;
