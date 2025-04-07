"use client";

import { useSession } from "next-auth/react";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";
import { useQuery } from "@tanstack/react-query";
import { getUserServers } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";

const CreateHousePage = () => {
  const user = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["user", user.data?.user.id],
    queryFn: () => getUserServers(user.data?.user.id ?? ""),
    enabled: !!user,
  });
  if (isLoading) return <LoadingComponent />;
  if (!user?.data || !user.data.user.id || !data || data.status !== "ok")
    return <NoData />;
  return <Content username={user.data.user.id} servers={data.servers} />;
};
export default CreateHousePage;
