import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import Image from "next/image";

const DoctrineTooltip = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center gap-1 p-2 transition-all duration-200">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src={`${
              process.env.NEXT_PUBLIC_IMAGES_IP_HOST
            }/images/doctrines/${label
              .toLowerCase()
              .replace(/[ ':]/g, "-")}.png`}
            alt={label}
            width={80}
            height={80}
          />
        </TooltipTrigger>
        <TooltipContent className="p-4 text-sm bg-background max-w-64">
          <div className="font-bold">{label}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);
export default DoctrineTooltip;
