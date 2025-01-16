"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import {
  getHouseStats,
  getSeasons,
  getSurveyList,
  SurveyList,
  UsersStats,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["houseStats", house],
    queryFn: () => getHouseStats(house),
    enabled: !!house,
  });
  const { data: seasons, isLoading: seasonsLoading } = useQuery({
    queryKey: ["seasons"],
    queryFn: () => getSeasons(),
  });
  const { data: list, isLoading: listLoading } = useQuery({
    queryKey: ["list", house],
    queryFn: () => getSurveyList(house),
    enabled: !!house,
  });
  if (isLoading || seasonsLoading || listLoading) return <LoadingComponent />;
  if (!data || !seasons || !list) return <NoData />;
  const noAttendance: UsersStats[] = list
    .filter(
      (item: SurveyList) =>
        !data.some((player: UsersStats) => player.id === item.discordId)
    )
    .map((item: SurveyList) => ({
      id: item.discordId,
      nick: item.inGameNick,
      house: [house],
      attendance: [],
    }));

  return (
    <Content
      data={[...data, ...noAttendance]}
      seasons={seasons}
      numberOfPlayer={list.length}
    />
  );
};
export default Page;
