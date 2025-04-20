"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { getUnitsAssets, getWeaponsAssets } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const { data: weaponsAssets, isLoading: weaponsAssetsLoading } = useQuery({
    queryKey: ["weaponsAssets"],
    queryFn: () => getWeaponsAssets(),
  });
  if (isLoading || weaponsAssetsLoading) return <LoadingComponent />;
  if (!data || !weaponsAssets) return <NoData />;

  return <Content unitsAssets={data} weapons={weaponsAssets} />;
}
