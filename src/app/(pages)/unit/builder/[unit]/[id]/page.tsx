"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getUnitAssets, getUnitPost } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";
import {
  commonDoctrines,
  epicDoctrines,
  rareDoctrines,
  uncommonDoctrines,
} from "@/assets/doctrines";

const Page = () => {
  const { unit, id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["unitPost", id],
    queryFn: () => getUnitPost(id.toString()),
    enabled: !!id,
  });
  const { data: unitAssets, isLoading: unitAssetsLoading } = useQuery({
    queryKey: ["unitAssets", unit],
    queryFn: () => getUnitAssets(unit.toString()),
    enabled: !!unit,
  });
  const doctrines = [
    ...epicDoctrines,
    ...rareDoctrines,
    ...commonDoctrines,
    ...uncommonDoctrines,
  ];
  if (isLoading || unitAssetsLoading) return <LoadingComponent />;
  if (!data || !unitAssets) return <NoData />;
  return <Content data={data} unitAssets={unitAssets} doctrines={doctrines} />;
};
export default Page;
