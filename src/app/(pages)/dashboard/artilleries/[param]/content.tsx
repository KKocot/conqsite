"use client";

import ImageComponent from "@/components/image-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { ArtilleryAsset } from "@/lib/get-data";
import { getArtilleryAssetOptions } from "@/lib/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useParams } from "next/navigation";

const Content = () => {
  const { param }: { param: string } = useParams();
  const cleanedParam = param.replaceAll("-", " ");
  const artilleryAssetOptions = getArtilleryAssetOptions(cleanedParam);
  const { data, isLoading } = useSuspenseQuery(artilleryAssetOptions);
  const artilleryData: ArtilleryAsset = data.artilleryAsset;

  if (!data) return <NoData />;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="p-4 sm:p-8 w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader
          className={clsx("text-lg font-medium", {
            "bg-gradient-to-l from-yellow-300 to-yellow-800":
              artilleryData.rarity === "legendary",
            "bg-gradient-to-l from-violet-300 to-violet-800":
              artilleryData.rarity === "epic",
            "bg-gradient-to-l from-blue-300 to-blue-800":
              artilleryData.rarity === "rare",
            "bg-gradient-to-l from-green-300 to-green-800":
              artilleryData.rarity === "common",
          })}
        >
          <h2 className="font-semibold">{artilleryData.name}</h2>
        </CardHeader>
        <CardContent className="flex p-4 gap-4">
          <ImageComponent
            type="artillery"
            name={artilleryData.name}
            width={150}
            height={150}
          />
          {artilleryData.materials.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold">Materials Required:</h3>
              <ul className="mt-4 space-y-2">
                {artilleryData.materials.map((material, index) => (
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
