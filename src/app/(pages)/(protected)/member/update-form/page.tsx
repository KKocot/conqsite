"use client";

import React, { FC } from "react";
import { useSession } from "next-auth/react";
import WizardForm from "@/feature/survey/wizard-form";
import LoadingComponent from "@/feature/ifs/loading";
import { UnitAssetsGroup } from "@/lib/get-data";

interface PageProps {
  unitsAssets: UnitAssetsGroup | undefined;
}

const Page = ({ unitsAssets }: PageProps) => {
  const { data } = useSession();
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
