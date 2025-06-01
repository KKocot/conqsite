"use client";

import clsx from "clsx";

const maps = [
  { name: "Map 1", image: "/maps/1-1.jpg", occurrence: ["map1", "map2"] },
  { name: "Map 2", image: "/maps/fort1.jpg", occurrence: ["map3", "map4"] },
];

const MapsTab = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (map: string) => void;
}) => {
  return (
    <div className="space-y-2">
      {maps.map((map) => (
        <div
          key={map.name}
          className={clsx(
            "flex items-center gap-3 p-2 border rounded-lg cursor-pointer",
            {
              "bg-background": value === map.image,
            }
          )}
          onClick={() => onChange(map.image)}
        >
          <div className="h-12 w-12 rounded-md overflow-hidden">
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
    </div>
  );
};

export default MapsTab;
