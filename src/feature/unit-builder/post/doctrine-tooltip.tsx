import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import Image from "next/image";
interface IconProps {
  img: string;
  label: string;
  description: string;
}

const DoctrineTooltip = ({ img, label, description }: IconProps) => (
  <div className="flex flex-col items-center justify-center gap-1 p-2 transition-all duration-200">
    <span className="text-xs text-center absolute -top-2 w-56">{label}</span>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image src={img} alt={label} width={70} height={70} />
        </TooltipTrigger>
        <TooltipContent className="p-4 text-sm bg-background max-w-64">
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);
export default DoctrineTooltip;
