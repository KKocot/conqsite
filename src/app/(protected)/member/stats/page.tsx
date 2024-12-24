"use client";

import { getSeasons, getUserStats } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Content from "./content";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["userStats", "user?.user.id"],
    queryFn: () => getUserStats(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });
  const { data: seasons, isLoading: seasonsLoading } = useQuery({
    queryKey: ["seasons"],
    queryFn: () => getSeasons(),
  });

  if (isLoading || seasonsLoading) return <LoadingComponent />;
  if (!data || !seasons) return <NoData />;
  return <Content data={data} seasons={seasons} />;
};
export default Page;
