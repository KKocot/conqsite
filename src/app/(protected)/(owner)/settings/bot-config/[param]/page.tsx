"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getHouseSettings } from "@/lib/get-data";
import Loading from "react-loading";
import { useSession } from "next-auth/react";

const Page = () => {
  const { param }: { param: string } = useParams();
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseConfig", param],
    queryFn: () => getHouseSettings(param),
    enabled: !!param,
  });

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <h1 className="text-2xl font-bold">House Not Found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 container">
      <Content data={data} creatorId={user?.user.id ?? ""} />
    </div>
  );
};
export default Page;
