"use client";

import TierList from "@/components/tier-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfileTierlistOptions } from "./lib/query";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const TierListContainer = ({ id }: { id: string }) => {
  const profileTierlistOptions = getProfileTierlistOptions(id);
  const { data, isLoading } = useSuspenseQuery(profileTierlistOptions);
  if (!data) return <NoData />;
  if (isLoading) return <LoadingComponent />;
  return <TierList data={data} />;
};

export default TierListContainer;
