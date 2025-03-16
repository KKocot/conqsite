"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { getUnitsAssets } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return <Content unitsAssets={data} />;
}
