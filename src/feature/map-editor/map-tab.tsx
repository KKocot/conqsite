import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { maps } from "./lib/assets";
import Image from "next/image";
import ImageComponent from "@/components/image-component";

const MapTab = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (map: string) => void;
}) => {
  return (
    <ScrollArea className="w-full h-[550px]">
      {maps.map((map) => (
        <div
          key={map}
          className={clsx(
            "flex flex-col items-center gap-3 p-2 border-2 cursor-pointer w-full mb-2",
            {
              "border-accent": value === map,
            }
          )}
          onClick={() => onChange(map)}
        >
          <h4 className="font-medium">{map}</h4>
          <div className="w-full">
            <ImageComponent name={map} width={150} height={150} type="map" />
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default MapTab;
