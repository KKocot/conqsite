"use client";

import React from "react";
import Content from "./content";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getHighRoles, getHouseAssets, getSurveys } from "@/lib/get-data";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page: React.FC = () => {
  const { param: house }: { param: string } = useParams();
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
  if (!surveysData || !rolesData) return <NoData />;

  return assetsData?.sharedList ||
    !!rolesData.find((e) => e.discordId === user?.user.id) ? (
    <Content
      house={house}
      surveysData={surveysData}
      rolesData={rolesData}
      houseAssets={assetsData}
      userId={user?.user.id ?? ""}
    />
  ) : (
    <div className="flex justify-center items-center h-screen w-full">
      Blocked for members
    </div>
  );
};

export default Page;
