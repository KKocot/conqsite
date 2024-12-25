"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHouseSettings } from "@/lib/get-data";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page = () => {
  const { param }: { param: string } = useParams();
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseConfig", param],
    queryFn: () => getHouseSettings(param),
    enabled: !!param,
  });

  if (isLoading || !user) return <LoadingComponent />;
  if (!data) return <NoData />;

  return (
    <div className="flex flex-col gap-6 container">
      <Content data={data} creatorId={user?.user.id ?? ""} />
    </div>
  );
};
export default Page;
