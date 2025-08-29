"use client";

import ImageComponent from "@/components/image-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { ArtilleryAsset } from "@/lib/get-data";
import { artilleriesAssetsOptions } from "@/lib/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";

const Content = () => {
  const { data, isLoading } = useSuspenseQuery(artilleriesAssetsOptions);
  const artilleriesData: ArtilleryAsset[] = data.artilleriesAsset;
  const sortedData = [...artilleriesData].sort((a, b) => {
    const rarityOrder = { legendary: 1, epic: 2, rare: 3, common: 4 };
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });
  if (!data) return <NoData />;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="p-4 sm:p-8 w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">Artillery Assets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center w-full">
        {sortedData.map((asset) => (
          <Link
            key={asset.name}
            href={`/dashboard/artilleries/${asset.name.replaceAll(" ", "-")}`}
          >
            <Card className="text-lg font-medium text-center">
              <CardHeader
                className={clsx("p-1 h-[64px] flex justify-center", {
                  "bg-gradient-to-t from-yellow-600 to-yellow-900":
                    asset.rarity === "legendary",
                  "bg-gradient-to-t from-violet-600 to-violet-900":
                    asset.rarity === "epic",
                  "bg-gradient-to-t from-blue-600 to-blue-900":
                    asset.rarity === "rare",
                  "bg-gradient-to-t from-green-600 to-green-900":
                    asset.rarity === "common",
                })}
              >
                <h2 className="font-semibold text-center">{asset.name}</h2>
              </CardHeader>
              <CardContent className="p-0">
                <ImageComponent
                  type="artillery"
                  name={asset.name}
                  width={300}
                  height={300}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Content;
