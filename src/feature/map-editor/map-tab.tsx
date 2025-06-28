import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageComponent from "@/components/image-component";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMapsAssets } from "@/lib/get-data";

const MapTab = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (map: string) => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["maps"],
    queryFn: () => getMapsAssets(),
  });
  const [mapValue, setMapValue] = useState<string>("");
  return isLoading ? (
    <div>Loading...</div>
  ) : !data ? (
    <div>No maps available</div>
  ) : (
    <>
      <Input
        type="text"
        placeholder="Search Map"
        value={mapValue}
        onChange={(e) => setMapValue(e.target.value)}
      />
      <ScrollArea className="w-full h-[550px]">
        {data
          .filter((e) => e.name.toLowerCase().includes(mapValue.toLowerCase()))
          .map((map) => (
            <Fragment key={map.name}>
              {map.types.map((type) => (
                <div
                  key={`${map.name} ${type}`}
                  className={clsx(
                    "flex flex-col items-center gap-3 p-2 border-2 cursor-pointer w-full mb-2",
                    {
                      "border-accent": value === `${map.name}-${type}`,
                    }
                  )}
                  onClick={() => onChange(`${map.name}-${type}`)}
                >
                  <h4 className="font-medium text-center">{`${map.name}-${type}`}</h4>
                  <div className="w-full">
                    <ImageComponent
                      name={`${map.name}-${type}`}
                      width={150}
                      height={150}
                      type="map"
                    />
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
      </ScrollArea>
    </>
  );
};

export default MapTab;
