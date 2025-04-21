"use client";

import React from "react";
import { useSession } from "next-auth/react";
import WizardForm from "@/feature/survey/wizard-form";
import LoadingComponent from "@/feature/ifs/loading";
import { getUnitsAssets, getWeaponsAssets } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { data } = useSession();
  const { data: unitsAssets, isLoading: unitsAssetsLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const { data: weaponsAssets, isLoading: weaponsAssetsLoading } = useQuery({
    queryKey: ["weaponsAssets"],
    queryFn: () => getWeaponsAssets(),
  });

  if (weaponsAssetsLoading || unitsAssetsLoading) return <LoadingComponent />;
  if (!data || !weaponsAssets || !unitsAssets) return <NoData />;
  return (
    <WizardForm
      weapons={weaponsAssets}
      user_id={data.user.id}
      avatar={data.user.image ?? ""}
      unitsAssets={unitsAssets}
    />
  );
};
export default Page;
