"use client";

import React, { useEffect } from "react";
import Content from "./content";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getHouseAssets,
  getPublicLineupDates,
  getSurveys,
} from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page: React.FC = () => {
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
  const { data: publicLineupsDates } = useQuery({
    queryKey: ["lineupsDates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });
  useEffect(() => {
    fetch(`/api/discord-data/uploadAttendance?house=${house}`);
  }, [house]);
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return (
    <div className="w-full">
      <Content
        surveysData={data}
        assets={assets}
        publicLineupsDates={publicLineupsDates}
      />
    </div>
  );
};

export default Page;
