"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getUnitPost, getUnitWiki } from "@/lib/get-data";
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
  const { data: unitWiki, isLoading: unitWikiLoading } = useQuery({
    queryKey: ["unitWiki", unit],
    queryFn: () => getUnitWiki(unit.toString(), "accepted"),
    enabled: !!unit,
  });
  const doctrines = [
    ...epicDoctrines,
    ...rareDoctrines,
    ...commonDoctrines,
    ...uncommonDoctrines,
  ];
  if (isLoading || unitWikiLoading) return <LoadingComponent />;
  if (!data || !unitWiki) return <NoData />;
  return (
    <Content
      data={data}
      doctrines={doctrines}
      unitTree={unitWiki[unitWiki.length - 1]}
    />
  );
};
export default Page;
