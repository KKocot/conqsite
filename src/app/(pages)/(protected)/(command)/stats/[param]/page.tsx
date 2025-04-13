"use client";

import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import {
  getFilledSurveys,
  getHouseSortedStats,
  getSeasons,
  getSurveyList,
  SurveyList,
  UsersStatsSorted,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["houseStatsSorted", house],
    queryFn: () => getHouseSortedStats(house),
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
  const { data: filledList, isLoading: filledListLoading } = useQuery({
    queryKey: ["filledList", house],
    queryFn: () => getFilledSurveys(house),
    enabled: !!house,
  });
  if (isLoading || seasonsLoading || listLoading || filledListLoading)
    return <LoadingComponent />;
  if (!data || !seasons || !list || !filledList) return <NoData />;
  const noAttendance: UsersStatsSorted[] = list
    .filter(
      (item: SurveyList) =>
        !data.some((player: UsersStatsSorted) => player.id === item.discordId)
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
      filledList={filledList}
    />
  );
};
export default Page;
