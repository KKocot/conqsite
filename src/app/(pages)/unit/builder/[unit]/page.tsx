"use client";

import { useParams } from "next/navigation";
import { getUnitAssets, getUnitWiki } from "@/lib/get-data";
import NoData from "@/feature/ifs/no-data";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/feature/ifs/loading";

const Page = () => {
  const unitName = useParams().unit.toString().replaceAll("_", " ");
  const { data: unitAssets } = useQuery({
    queryKey: ["unitAssets", unitName],
    queryFn: () => getUnitAssets(unitName),
    enabled: true,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["unitBuilder", unitName],
    queryFn: () => getUnitWiki(unitName, "accepted"),
    enabled: !!unitName,
  });
  if (isLoading) return <LoadingComponent />;
  if (!unitAssets || !data) return <NoData />;
  return <Content data={unitAssets} unitTree={data[data.length - 1]} />;
};
export default Page;
