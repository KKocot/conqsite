"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { getUnitWikiById } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { param: id }: { param: string } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["previewUnit", id],
    queryFn: () => getUnitWikiById(id),
    enabled: !!id,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};
export default Page;
