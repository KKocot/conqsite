"use client";

import { getHousesDetails } from "@/lib/get-data";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import Loading from "react-loading";
import HouseCard from "@/components/house-card";

const HousesPage = () => {
  const t = useTranslations("HousePage");
  const { data, isLoading } = useQuery({
    queryKey: ["houses"],
    queryFn: getHousesDetails,
  });
  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  return (
    <div className="flex flex-col items-center container">
      <ul className="flex flex-wrap gap-4 m-12 justify-around">
        {data.map((house) => (
          <HouseCard key={house.name} house={house} />
        ))}
      </ul>
    </div>
  );
};
export default HousesPage;
