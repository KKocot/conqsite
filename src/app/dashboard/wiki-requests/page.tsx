"use client";

import { getUnitsReview } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wiki-requests"],
    queryFn: () => getUnitsReview(),
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};

export default Page;
