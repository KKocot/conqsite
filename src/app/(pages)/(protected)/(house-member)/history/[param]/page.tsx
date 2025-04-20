"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHistoryDates } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["dateslist", house],
    queryFn: () => getHistoryDates(house),
    enabled: !!house,
  });
  if (isLoading) return <LoadingComponent />;
  const dates = data
    ? Array.from(new Set(data.map((item) => item)))
    : undefined;
  return <Content house={house} dates={dates} />;
};

export default Page;
