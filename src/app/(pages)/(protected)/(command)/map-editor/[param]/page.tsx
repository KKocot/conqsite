"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { useParams } from "next/navigation";
import { getPublicLineupDates, getUnitsAssets } from "@/lib/get-data";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const dates = useQuery({
    queryKey: ["lineupsDates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });
  const unitsAssets = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  return <Content dates={dates} house={house} unitsAssets={unitsAssets} />;
};

export default Page;
