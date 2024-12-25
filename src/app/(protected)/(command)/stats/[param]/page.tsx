"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getHouseStats, getSeasons } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["house", house],
    queryFn: () => getHouseStats(house),
    enabled: !!house,
  });
  const { data: seasons, isLoading: seasonsLoading } = useQuery({
    queryKey: ["seasons"],
    queryFn: () => getSeasons(),
  });
  if (isLoading || seasonsLoading) return <LoadingComponent />;
  if (!data || !seasons) return <NoData />;
  return <Content data={data} seasons={seasons} />;
};
export default Page;
