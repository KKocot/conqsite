"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { getMapAssets } from "@/lib/get-data";
import NoData from "@/feature/ifs/no-data";
import LoadingComponent from "@/feature/ifs/loading";
import { useParams } from "next/navigation";

const Page = () => {
  const { map }: { map: string } = useParams();
  const cleanMapName = map.replaceAll("_", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["maps"],
    queryFn: () => getMapAssets(cleanMapName),
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};

export default Page;
