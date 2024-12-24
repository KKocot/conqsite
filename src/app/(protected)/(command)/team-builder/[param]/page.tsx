"use client";

import React, { useState } from "react";
import Content from "./content";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSurveys } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page: React.FC = () => {
  const { param: house }: { param: string } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["surveysList", house],
    queryFn: () => getSurveys(house),
    enabled: !!house,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return (
    <div className="w-full">
      <Content surveysData={data} />
    </div>
  );
};

export default Page;
// TODO translation
