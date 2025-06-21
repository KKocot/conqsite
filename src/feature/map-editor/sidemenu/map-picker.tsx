import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { Map } from "lucide-react";
import { maps } from "../lib/assets";
import clsx from "clsx";

// To delete when we change the map assets
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

const MapPicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (map: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background">
          <Map className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-4">
        {mapAssets.map((map) => (
          <div
            key={map.name}
            className={clsx(
              "flex items-center gap-3 p-2 border rounded-lg cursor-pointer",
              {
                "bg-background": value === map.image,
              }
            )}
            onClick={() => onChange(map.src)}
          >
            <div className="h-24 w-24 rounded-md overflow-hidden">
              <img
                src={map.image}
                alt={map.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{map.name}</h4>
              <div className="flex gap-1 flex-wrap">
                {map.occurrence.map((occ) => (
                  <span key={occ} className="text-xs px-2 py-0.5 rounded">
                    {occ}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default MapPicker;
