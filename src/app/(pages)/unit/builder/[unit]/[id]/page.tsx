"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getDoctrineAssets, getUnitPost, getUnitWiki } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { unit, id } = useParams();
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
    queryKey: ["doctrinesAssets"],
    queryFn: () => getDoctrineAssets(),
  });
  if (isLoading || unitWikiLoading || doctrinesLoading)
    return <LoadingComponent />;
  if (!data || !unitWiki || !doctrines) return <NoData />;
  return (
    <Content
      data={data}
      doctrines={doctrines}
      unitTree={unitWiki[unitWiki.length - 1]}
    />
  );
};
export default Page;
