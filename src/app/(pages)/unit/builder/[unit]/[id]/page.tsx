"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import {
  getUnitAssets,
  getUnitDoctrines,
  getUnitPost,
  getUnitWiki,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { unit, id } = useParams();
  const unitName = unit.toString().replaceAll("_", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["unitPost", id],
    queryFn: () => getUnitPost(id.toString()),
    enabled: !!id,
  });
  const { data: unitWiki, isLoading: unitWikiLoading } = useQuery({
    queryKey: ["unitWiki", unit],
    queryFn: () => getUnitWiki(unit.toString(), "accepted"),
    enabled: !!unit,
  });
  const { data: doctrines, isLoading: doctrinesLoading } = useQuery({
    queryKey: ["doctrinesAssets", unitName],
    queryFn: () => getUnitDoctrines(unitName),
  });
  const { data: unitAssets, isLoading: unitAssetsLoading } = useQuery({
    queryKey: ["unitAssets", unitName],
    queryFn: () => getUnitAssets(unitName),
    enabled: true,
  });
  if (isLoading || unitWikiLoading || doctrinesLoading || unitAssetsLoading)
    return <LoadingComponent />;
  if (!data || !unitWiki || !doctrines || !unitAssets) return <NoData />;
  return (
    <Content
      data={data}
      doctrines={doctrines}
      unitTree={unitWiki[unitWiki.length - 1]}
      unitAssets={unitAssets}
    />
  );
};
export default Page;
