import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";

const mapAssets = [
  {
    name: "Map 1",
    image: "/maps/1-1.jpg",
    occurrence: ["map1", "map2"],
    src: "1-1",
  },
  {
    name: "Map 2",
    image: "/maps/fort1.jpg",
    occurrence: ["map3", "map4"],
    src: "fort1",
  },
];

const MapTab = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (map: string) => void;
}) => {
  return (
    <ScrollArea className="w-full h-[550px]">
      {mapAssets.map((map) => (
        <div
          key={map.name}
          className={clsx(
            "flex flex-col items-center gap-3 p-2 border-2 cursor-pointer w-full mb-2",
            {
              "border-accent": value === map.src,
            }
          )}
          onClick={() => onChange(map.src)}
        >
          <h4 className="font-medium">{map.name}</h4>
          <div className="w-full">
            <img
              src={map.image}
              alt={map.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default MapTab;
