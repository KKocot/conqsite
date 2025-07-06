import ImageComponent from "@/components/image-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArtilleryAsset } from "@/lib/get-data";
import clsx from "clsx";
import Link from "next/link";

const Content = ({ data }: { data: ArtilleryAsset[] }) => {
  const sortedData = [...data].sort((a, b) => {
    const rarityOrder = { legendary: 1, epic: 2, rare: 3, common: 4 };
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });
  data = sortedData;
  return (
    <div className="p-4 sm:p-8 w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">Artillery Assets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center w-full">
        {data.map((asset) => (
          <Link
            key={asset.name}
            href={`/dashboard/artilleries/${asset.name.replaceAll(" ", "-")}`}
          >
            <Card
              className={clsx("text-lg font-medium text-center", {
                "bg-gradient-to-t from-yellow-300 to-yellow-800":
                  asset.rarity === "legendary",
                "bg-gradient-to-t from-violet-300 to-violet-800":
                  asset.rarity === "epic",
                "bg-gradient-to-t from-blue-300 to-blue-800":
                  asset.rarity === "rare",
                "bg-gradient-to-t from-green-300 to-green-800":
                  asset.rarity === "common",
              })}
            >
              <CardHeader className="px-2">
                <h2 className="font-semibold h-[48px] text-center">
                  {asset.name}
                </h2>
              </CardHeader>
              <CardContent>
                <ImageComponent
                  type="artillery"
                  name={asset.name}
                  width={150}
                  height={150}
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
