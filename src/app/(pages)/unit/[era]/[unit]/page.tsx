"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { getUnit } from "@/lib/utils";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getUnitPosts, getUnitsAssets, getUnitWiki } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { data: unitsAssets } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const params = useParams();
  const unit = params.unit.toString();
  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";
  const found_unit: Unit | null = getUnit(unit, era, unitsAssets) ?? null;
  const { data, isLoading } = useQuery({
    queryKey: ["unit", found_unit?.name],
    queryFn: () => getUnitWiki(found_unit?.name ?? "", "accepted"),
    enabled: !!found_unit,
  });
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["unitPosts", found_unit?.name],
    queryFn: () => getUnitPosts(found_unit?.name.toLocaleLowerCase() ?? ""),
    enabled: !!found_unit,
  });
  if (isLoading) return <LoadingComponent />;
  if (!found_unit) return <NoData />;
  return (
    <Content
      entry={data?.[data.length - 1] ?? undefined}
      shortEntry={found_unit}
      posts={posts}
      postsLoading={loadingPosts}
    />
  );
};
export default Page;
