"use client";

import { getSeasons, getUserStats } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Content from "./content";

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

  if (isLoading || seasonsLoading) return <div>Loading...</div>;
  if (!data || !seasons) return <div>No data</div>;
  return <Content data={data} seasons={seasons} />;
};
export default Page;
