"use client";

import { getAllHousesBadges } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import Content from "./content";

const HousesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["housesBadges"],
    queryFn: getAllHousesBadges,
  });

  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  const sortedData = [...data].sort((_a, b) => (b.premium ? 1 : -1));

  return (
    <div className="flex flex-col items-center sm:px-6">
      <Content data={sortedData} />
    </div>
  );
};
export default HousesPage;
