"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { getUnit } from "@/lib/utils";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getUnitWiki } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const params = useParams();
  const unit = params.unit.toString();
  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";
  const found_unit: Unit | null = getUnit(unit, era) ?? null;
  const { data, isLoading } = useQuery({
    queryKey: ["unit", found_unit?.name],
    queryFn: () => getUnitWiki(found_unit?.name ?? ""),
    enabled: !!found_unit,
  });
  if (isLoading) return <LoadingComponent />;
  if (!found_unit) return <NoData />;
  const lastAccepted = data?.filter((d) => d.accepted ?? d);
  return (
    <Content
      entry={lastAccepted?.[lastAccepted.length - 1] ?? undefined}
      shortEntry={found_unit}
    />
  );
};
export default Page;
