"use client";

import TierList from "@/components/tier-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tierListOptions } from "./lib/query";

const TierListContainer = () => {
  const { data } = useSuspenseQuery(tierListOptions);
  return (
    <div className="flex flex-col gap-6 mt-6">
      <TierList data={data} />
    </div>
  );
};
export default TierListContainer;
