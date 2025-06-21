import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const TooltipContainer = ({
  children,
  title,
  side = "left",
}: {
  children: ReactNode;
  title: string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side}>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipContainer;
