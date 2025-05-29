"use client";

import { useDrag } from "react-dnd";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DoctrineData {
  name: string;
  img: string;
  forUnit: string[];
  dedicated: "all" | "group" | "unit";
  stats: string;
}
interface DoctrineProps {
  doctrine: DoctrineData;
}
const ItemTypes = {
  DOCTRINE: "doctrine",
};

const DoctrineItem = ({ doctrine }: DoctrineProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DOCTRINE,
    item: { name: doctrine.name, img: doctrine.img, stats: doctrine.stats },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger disabled>
          <div
            // @ts-ignore
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className={`${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            <Image
              src={`${
                process.env.NEXT_PUBLIC_IMAGES_IP_HOST
              }/images/doctrines/${doctrine.name
                .toLowerCase()
                .replace(/[ ':]/g, "-")}.png`}
              alt={doctrine.name}
              width={64}
              height={64}
              title={doctrine.name}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-64">
          <h3 className="font-bold mb-2">{doctrine.name}</h3>
          <div>{doctrine.stats}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DoctrineItem;
