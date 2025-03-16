"use client";

import React from "react";
import Content from "./content";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getHighRoles,
  getHouseAssets,
  getSurveys,
  UnitAssetsGroup,
} from "@/lib/get-data";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useTranslations } from "next-intl";

interface PageProps {
  unitsAssets: UnitAssetsGroup | undefined;
}

const Page = ({ unitsAssets }: PageProps) => {
  const { param }: { param: string } = useParams();
  const t = useTranslations("MyHouse");
  const house = param.replaceAll("%20", " ");
  const { data: user } = useSession();
  const { data: surveysData, isLoading: surveysIsLoading } = useQuery({
    queryKey: ["surveysList", house],
    queryFn: () => getSurveys(house),
    enabled: !!house,
  });

  const { data: rolesData, isLoading: rolesIsLoading } = useQuery({
    queryKey: ["rolesList", house],
    queryFn: () => getHighRoles(house),
    enabled: !!house,
  });

  const { data: assetsData } = useQuery({
    queryKey: ["houseAssets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });

  if (rolesIsLoading || surveysIsLoading) return <LoadingComponent />;
  if (!surveysData || !rolesData || !unitsAssets) return <NoData />;

  return assetsData?.sharedList ||
    !!rolesData.find((e) => e.discordId === user?.user.id) ? (
    <Content
      house={house}
      surveysData={surveysData}
      rolesData={rolesData}
      houseAssets={assetsData}
      userId={user?.user.id ?? ""}
      unitsAssets={unitsAssets}
    />
  ) : (
    <div className="flex justify-center items-center h-screen w-full">
      {t("blocked")}
    </div>
  );
};

export default Page;
