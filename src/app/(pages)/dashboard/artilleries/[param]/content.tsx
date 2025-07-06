import ImageComponent from "@/components/image-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArtilleryAsset } from "@/lib/get-data";
import clsx from "clsx";

const Content = ({ data }: { data: ArtilleryAsset }) => {
  return (
    <div className="p-4 sm:p-8 w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader
          className={clsx("text-lg font-medium", {
            "bg-gradient-to-l from-yellow-300 to-yellow-800":
              data.rarity === "legendary",
            "bg-gradient-to-l from-violet-300 to-violet-800":
              data.rarity === "epic",
            "bg-gradient-to-l from-blue-300 to-blue-800":
              data.rarity === "rare",
            "bg-gradient-to-l from-green-300 to-green-800":
              data.rarity === "common",
          })}
        >
          <h2 className="font-semibold">{data.name}</h2>
        </CardHeader>
        <CardContent className="flex p-4 gap-4">
          <ImageComponent
            type="artillery"
            name={data.name}
            width={150}
            height={150}
          />
          {data.materials.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold">Materials Required:</h3>
              <ul className="mt-4 space-y-2">
                {data.materials.map((material, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    {material.name}: {material.amount}
                    <ImageComponent
                      type="material"
                      className={clsx("rounded p-1", {
                        "bg-green-700": data.rarity === "common",
                        "bg-blue-700/50":
                          data.rarity === "rare" || data.rarity === "epic",
                      })}
                      name={material.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;
