"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHouseSettings } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useSession } from "next-auth/react";
import WIP from "@/feature/ifs/wip";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseSettings", house],
    queryFn: () => getHouseSettings(house),
    enabled: !!house,
  });

  if (isLoading) return <LoadingComponent />;
  if (!data || !user) return <NoData />;

  // return <Content config={data} house={house} userId={user.user.id} />;
  return <WIP />;
};
export default Page;
