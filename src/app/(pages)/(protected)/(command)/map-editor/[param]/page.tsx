"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { useParams } from "next/navigation";
import {
  getArtilleryAssets,
  getPublicLineupDates,
  getUnitsAssets,
} from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

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
  const artAssets = useQuery({
    queryKey: ["artilleryAssets"],
    queryFn: () => getArtilleryAssets(),
    enabled: true,
  });
  if (unitsAssets.isLoading || artAssets.isLoading) return <LoadingComponent />;
  if (!unitsAssets.data || !artAssets.data) return <NoData />;

  return <Content unitsAssets={unitsAssets.data} artAssets={artAssets.data} />;
};

export default Page;
