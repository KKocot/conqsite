"use client";

import { useParams } from "next/navigation";
import Content from "./content";
import { useQuery } from "@tanstack/react-query";
import { getBotEvent, getHouseSettings } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useSession } from "next-auth/react";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["houseSettings", house],
    queryFn: () => getHouseSettings(house),
    enabled: !!house,
  });
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events", house],
    queryFn: () => getBotEvent(house),
    enabled: !!house,
  });
  if (isLoading || eventsLoading) return <LoadingComponent />;
  if (!data || !user || !events) return <NoData />;

  return (
    <Content
      config={data}
      events={events}
      house={house}
      userId={user.user.id}
    />
  );
};
export default Page;
