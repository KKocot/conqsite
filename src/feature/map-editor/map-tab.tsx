import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import { maps } from "./lib/assets";
import ImageComponent from "@/components/image-component";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MapTab = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (map: string) => void;
}) => {
  const [mapValue, setMapValue] = useState<string>("");
  return (
    <>
      <Input
        type="text"
        placeholder="Search Map"
        value={mapValue}
        onChange={(e) => setMapValue(e.target.value)}
      />
      <ScrollArea className="w-full h-[550px]">
        {maps
          .filter((e) => e.toLowerCase().includes(mapValue.toLowerCase()))
          .map((map) => (
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
                <ImageComponent
                  name={map}
                  width={150}
                  height={150}
                  type="map"
                />
              </div>
            </div>
          ))}
      </ScrollArea>
    </>
  );
};

export default MapTab;
