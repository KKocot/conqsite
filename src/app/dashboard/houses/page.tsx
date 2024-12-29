"use client";

import { getHousesAssets, getHousesDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import HouseCard from "@/components/house-card";
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
  return (
    <div className="flex flex-col items-center container">
      <ul className="flex flex-wrap gap-4 m-12 justify-around">
        {data.map((house) => (
          <HouseCard key={house.name} house={house} assetsData={assetsData} />
        ))}
      </ul>
    </div>
  );
};
export default HousesPage;
