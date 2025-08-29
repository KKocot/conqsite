"use client";

import TierList from "@/components/tier-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tierListOptions } from "./lib/query";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const TierListContainer = () => {
  const { data, isLoading } = useSuspenseQuery(tierListOptions);
  if (!data) return <NoData />;
  if (isLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col gap-6 mt-6">
      <TierList data={data} />
    </div>
  );
};
export default TierListContainer;
