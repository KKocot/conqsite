"use client";

import TierList from "@/components/tier-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfileTierlistOptions } from "./lib/query";

const TierListContainer = ({ id }: { id: string }) => {
  const profileTierlistOptions = getProfileTierlistOptions(id);
  const { data } = useSuspenseQuery(profileTierlistOptions);
  return <TierList data={data} />;
};

export default TierListContainer;
