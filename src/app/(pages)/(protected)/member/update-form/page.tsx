"use client";

import React from "react";
import { useSession } from "next-auth/react";
import WizardForm from "@/feature/survey/wizard-form";
import LoadingComponent from "@/feature/ifs/loading";
import { getUnitsAssets } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data } = useSession();
  const { data: unitsAssets } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });

  if (!data || !unitsAssets) return <LoadingComponent />;
  return (
    <WizardForm
      user_id={data.user.id}
      avatar={data.user.image ?? ""}
      unitsAssets={unitsAssets}
    />
  );
};
export default Page;
