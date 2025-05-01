"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import {
  getAllUnitPosts,
  getKitsAssets,
  getUnitAssets,
  getUnitDoctrines,
  getUnitRate,
  getUnitWiki,
} from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const params = useParams();
  const unit = params.unit.toString();
  const { data: unitAssets } = useQuery({
    queryKey: ["unitsAssets", unit],
    queryFn: () => getUnitAssets(unit),
    enabled: !!unit,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["unitWiki", unit],
    queryFn: () => getUnitWiki(unit, "accepted"),
    enabled: !!unit,
  });
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["unitPosts", unit],
    queryFn: () => getAllUnitPosts(unit),
    enabled: !!unit,
  });
  const { data: unitRate } = useQuery({
    queryKey: ["unitRate", unit],
    queryFn: () => getUnitRate(unit),
    enabled: !!unit,
  });
  const { data: KitsAssets } = useQuery({
    queryKey: ["kitsAssets", unit],
    queryFn: () => getKitsAssets(unit),
    enabled: !!unit,
  });
  const { data: doctrinesAssets, isLoading: doctrinesAssetsLoading } = useQuery(
    {
      queryKey: ["doctrinesAssets", unit],
      queryFn: () => getUnitDoctrines(unit),
      select: (data) =>
        data.filter((doctrine) =>
          doctrine.forUnit.includes(unit.replaceAll("_", " "))
        ),
    }
  );
  if (isLoading) return <LoadingComponent />;
  if (!unitAssets) return <NoData />;
  return (
    <Content
      doctrines={doctrinesAssets ?? []}
      kits={KitsAssets ?? []}
      entry={data?.[data.length - 1] ?? undefined}
      shortEntry={unitAssets}
      posts={posts}
      postsLoading={loadingPosts}
      votes={unitRate?.votes || []}
    />
  );
};
export default Page;
