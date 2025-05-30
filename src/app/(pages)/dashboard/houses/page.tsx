"use client";

import { getAllHousesBadges } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import HouseCard from "@/feature/house-settings/house-card";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const HousesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["housesBadges"],
    queryFn: getAllHousesBadges,
  });
  const defaultCard = {
    name: "House",
    description: "House description",
    country: "House country",
    discordLink: "House discordLink",
    avatar: "House avatar",
    server: "House server",
  };
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  const sortedData = [...data].sort((a, b) => (b.premium ? 1 : -1));
  return (
    <div className="flex flex-col items-center sm:px-6">
      <ul className="flex flex-wrap gap-4 my-12 justify-around">
        {sortedData.map((house) => (
          <HouseCard
            key={house.house}
            house={house.card ?? defaultCard}
            badgesData={house}
          />
        ))}
      </ul>
    </div>
  );
};
export default HousesPage;
