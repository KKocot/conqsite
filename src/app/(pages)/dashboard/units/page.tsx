"use client";

import { useQuery } from "@tanstack/react-query";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";
import { getUnitsAssets } from "@/lib/get-data";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  if (!data) return <NoData />;

  return <Content unitsAssets={data} />;
};
export default Page;
