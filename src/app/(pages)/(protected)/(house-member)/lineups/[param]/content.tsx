"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import Preview from "@/feature/team-builder/preview";
import { ArtilleryAsset, getPublicLineup, getSurvey } from "@/lib/get-data";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Content = ({
  date,
  house,
  units,
  lineupName,
  artillery,
}: {
  date: string;
  house: string;
  units: Unit[];
  lineupName: string | null;
  artillery: ArtilleryAsset[];
}) => {
  const { data: user } = useSession();
  const cleanedLineupName = lineupName?.replaceAll("_", " ");
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
  const [name, setName] = useState<string>(
    cleanedLineupName ?? data?.[0]?.name ?? ""
  );
  useEffect(() => {
    const found = data?.find((e) => e.name === cleanedLineupName);
    if (cleanedLineupName && data) {
      if (found) setName(found.name);
    }
    if (!found && data) {
      setName(data[0].name);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("name", data[0].name);
      newUrl.searchParams.set("date", date || "");
      window.history.pushState({}, "", newUrl);
    }
  }, [cleanedLineupName, data]);
  if (isLoading || surveyLoading) return <LoadingComponent />;
  if (!data || !survey) return <NoData />;

  const onChangeName = (e: string) => {
    setName(e);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("name", e);
    newUrl.searchParams.set("date", date || "");
    window.history.pushState({}, "", newUrl);
  };
  return (
    <Tabs
      value={name}
      className="w-full flex flex-col"
      onValueChange={(e) => {
        onChangeName(e);
      }}
    >
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
            artillery={artillery}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
