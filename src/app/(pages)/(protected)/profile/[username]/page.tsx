"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { getUserUnitsPosts } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { username } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["userPosts", username],
    queryFn: () => getUserUnitsPosts(username.toString()),
    enabled: !!username,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;
  return <Content data={data} />;
};

export default Page;
