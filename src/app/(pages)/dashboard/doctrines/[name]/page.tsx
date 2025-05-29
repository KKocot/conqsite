"use client";

import LoadingComponent from "@/feature/ifs/loading";
import { getDoctrineByName } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { name }: { name: string } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["doctrine", name],
    queryFn: () => getDoctrineByName(name),
  });
  return isLoading ? (
    <LoadingComponent />
  ) : !data ? (
    <NoData />
  ) : (
    <Content doctrine={data} />
  );
};
export default Page;
