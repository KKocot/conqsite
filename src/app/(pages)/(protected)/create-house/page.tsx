"use client";

import { useSession } from "next-auth/react";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";
import { useQuery } from "@tanstack/react-query";
import { getRoleById, getUserServers } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";

const CreateHousePage = () => {
  const user = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["user", user.data?.user.id],
    queryFn: () => getUserServers(user.data?.user.id ?? ""),
    enabled: !!user,
  });
  const { data: userRole } = useQuery({
    queryKey: ["userRole", user.data?.user.id],
    queryFn: () => getRoleById(user.data?.user.id ?? ""),
    enabled: !!user,
  });
  const houseLeader =
    userRole && userRole?.some((role) => role.role === "HouseLeader");

  if (!!houseLeader) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You are not authorized to create a house</p>
        <p>You are already a house leader in one house</p>
      </div>
    );
  }
  if (isLoading) return <LoadingComponent />;
  if (!user?.data || !user.data.user.id || !data || data.status !== "ok")
    return <NoData />;
  return <Content username={user.data.user.id} servers={data.servers} />;
};
export default CreateHousePage;
