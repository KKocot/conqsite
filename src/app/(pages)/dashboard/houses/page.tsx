"use client";

import { getHousesAssets, getHousesDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import HouseCard from "@/feature/house-settings/house-card";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const HousesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["houses"],
    queryFn: getHousesDetails,
  });
  const { data: assetsData, isLoading: assetsLoading } = useQuery({
    queryKey: ["housesAssets"],
    queryFn: getHousesAssets,
  });
  if (isLoading || assetsLoading) return <LoadingComponent />;
  if (!data || !assetsData) return <NoData />;
  const fullData = data
    .map((house) => {
      const houseAssets = assetsData.find((asset) => asset.name === house.name);
      return houseAssets
        ? {
            name: house.name,
            card: house,
            houseAssets,
          }
        : {
            name: house.name,
            card: house,
            houseAssets: {
              name: house.name,
              premium: false,
              sharedList: false,
              signupBot: "",
              messages: true,
            },
          };
    })
    .sort(
      (a, b) => Number(b.houseAssets.premium) - Number(a.houseAssets.premium)
    );
  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-wrap gap-4 my-12 justify-around">
        {fullData.map((house) => (
          <HouseCard
            key={house.name}
            house={house.card}
            assetsData={house.houseAssets}
          />
        ))}
      </ul>
    </div>
  );
};
export default HousesPage;
