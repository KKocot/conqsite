"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHouseSettings, getUserServers } from "@/lib/get-data";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseConfig", house],
    queryFn: () => getHouseSettings(house),
    enabled: !!house,
  });
  const { data: servers, isLoading: loadingServers } = useQuery({
    queryKey: ["user", user?.user.id],
    queryFn: () => getUserServers(user?.user.id ?? ""),
    enabled: !!user,
  });
  if (isLoading || !user || loadingServers) return <LoadingComponent />;
  if (!data || !servers || servers.status !== "ok") return <NoData />;

  return (
    <div className="flex flex-col gap-6 container">
      <Content
        data={data}
        creatorId={user?.user.id ?? ""}
        servers={servers.servers}
      />
    </div>
  );
};
export default Page;
