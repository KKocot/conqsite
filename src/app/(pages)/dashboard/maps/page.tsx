"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import { getMapsAssets } from "@/lib/get-data";
import NoData from "@/feature/ifs/no-data";
import LoadingComponent from "@/feature/ifs/loading";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["maps"],
    queryFn: () => getMapsAssets(),
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};

export default Page;
