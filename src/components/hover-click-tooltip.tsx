"use client";

import React, { FC, ReactNode, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface HoverClickTooltipProps {
  triggerChildren: ReactNode;
  children: ReactNode;
  buttonStyle?: string;
  contentStyle?: string;
}

const HoverClickTooltip: FC<HoverClickTooltipProps> = ({
  triggerChildren,
  children,
  buttonStyle,
  contentStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={clsx("p-0 h-fit", buttonStyle)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {triggerChildren}
          </Button>
        </TooltipTrigger>
        <TooltipContent className={clsx(contentStyle)}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HoverClickTooltip;
