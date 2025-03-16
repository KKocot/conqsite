"use client";

import React, { useEffect } from "react";
import Content from "./content";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getHouseAssets,
  getPublicLineupDates,
  getSurveys,
  getUnitsAssets,
} from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { data: unitsAssets } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");

  const { data, isLoading } = useQuery({
    queryKey: ["surveysList", house],
    queryFn: () => getSurveys(house),
    enabled: !!house,
  });
  const { data: assets } = useQuery({
    queryKey: ["assets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });
  const { data: publicLineupsDates, isLoading: publicLineupsLoading } =
    useQuery({
      queryKey: ["lineupsDates", house],
      queryFn: () => getPublicLineupDates(house),
      enabled: !!house,
    });

  useEffect(() => {
    fetch(`/api/discord-bot/uploadAttendance?house=${house}`);
  }, [house]);
  if (isLoading) return <LoadingComponent />;
  if (!data || !unitsAssets) return <NoData />;

  return (
    <div className="w-full">
      <Content
        unitsAssets={unitsAssets}
        surveysData={data}
        assets={assets}
        publicLineups={{
          dates: publicLineupsDates,
          loading: publicLineupsLoading,
        }}
      />
    </div>
  );
};

export default Page;
