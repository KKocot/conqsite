"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import Preview from "@/feature/team-builder/preview";
import { getPublicLineup, getSurvey } from "@/lib/get-data";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Content = ({
  date,
  house,
  units,
}: {
  date: string;
  house: string;
  units: Unit[];
}) => {
  const { data: user } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["lineups", house, date],
    queryFn: () => getPublicLineup(house, date),
    enabled: !!house,
  });
  const { data: survey, isLoading: surveyLoading } = useQuery({
    queryKey: ["survey", user?.user.id],
    queryFn: () => getSurvey(user?.user.id ?? ""),
    enabled: !!house,
  });
  if (isLoading || surveyLoading) return <LoadingComponent />;
  if (!data || !survey) return <NoData />;
  return (
    <Tabs defaultValue={data[0].name} className="w-full flex flex-col">
      <TabsList>
        {data.map((e) => (
          <TabsTrigger key={e.name + "triggers"} value={e.name}>
            {e.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((e) => (
        <TabsContent
          key={e.name + "content"}
          value={e.name}
          className="flex self-center"
        >
          <Preview
            data={e.sheet}
            units={units}
            username={survey.inGameNick}
            commander={e.commander}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
