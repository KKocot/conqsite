"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getArtilleryAssets } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import Content from "./content";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["artilleries"],
    queryFn: getArtilleryAssets,
  });

  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};

export default Page;
