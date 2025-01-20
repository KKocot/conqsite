"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import {
  getDiscordUsers,
  getHighRoles,
  getHouseAssets,
  getHouseSettings,
} from "@/lib/get-data";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseSettings", house],
    queryFn: () => getHouseSettings(house),
    enabled: !!house,
  });
  const { data: membersList, isLoading: membersListLoading } = useQuery({
    queryKey: ["highRoles", house],
    queryFn: () =>
      getDiscordUsers(
        data?.id ?? "",
        user?.user.id ?? "",
        data?.member.id ?? ""
      ),
    enabled: !!data && !!user,
  });
  const { data: highRolesList, isLoading: highRolesListLoading } = useQuery({
    queryKey: ["highRolesList", house],
    queryFn: () => getHighRoles(house),
    enabled: !!house,
  });
  const { data: assets } = useQuery({
    queryKey: ["houseAssets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });
  if (isLoading || membersListLoading || highRolesListLoading) {
    return <LoadingComponent />;
  }

  if (!data || !membersList || !highRolesList || !user) {
    return <NoData />;
  }
  return (
    <div className="flex flex-col gap-6 container">
      <Content
        members={membersList}
        highRoles={highRolesList}
        assets={assets}
      />
    </div>
  );
};
export default Page;
