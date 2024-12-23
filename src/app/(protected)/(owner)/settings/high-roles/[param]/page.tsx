"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import Loading from "react-loading";
import {
  getDiscordUsers,
  getHighRoles,
  getHouseSettings,
} from "@/lib/get-data";
import { useSession } from "next-auth/react";

const Page = () => {
  const { param }: { param: string } = useParams();
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseSettings", param],
    queryFn: () => getHouseSettings(param),
    enabled: !!param,
  });
  const { data: highRolesData, isLoading: highRolesLoading } = useQuery({
    queryKey: ["highRoles", param],
    queryFn: () =>
      getDiscordUsers(
        data?.id ?? "",
        user?.user.id ?? "",
        data?.member.id ?? ""
      ),
    enabled: !!data,
  });
  const { data: highRolesList, isLoading: highRolesListLoading } = useQuery({
    queryKey: ["highRolesList", param],
    queryFn: () => getHighRoles(param),
    enabled: !!param,
  });
  if (isLoading || highRolesLoading || highRolesListLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  if (!data || !highRolesData || !highRolesList || !user) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <h1 className="text-2xl font-bold">House Not Found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 container">
      <Content members={highRolesData} highRoles={highRolesList} />
    </div>
  );
};
export default Page;
