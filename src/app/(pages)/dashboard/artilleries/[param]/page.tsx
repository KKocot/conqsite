"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getArtilleryAsset } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { param }: { param: string } = useParams();
  const cleanedParam = param.replaceAll("-", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["artillery", cleanedParam],
    queryFn: () => getArtilleryAsset(cleanedParam),
    enabled: !!param,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};
export default Page;
