"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import MapEditor from "@/feature/map-editor/editor";
import {
  DEFAULT_PLAN,
  DEFAULT_TOOLS_CONFIG,
} from "@/feature/map-editor/lib/assets";
import { Plan } from "@/feature/map-editor/lib/types";
import Preview from "@/feature/team-builder/preview";
import {
  ArtilleryAsset,
  getPublicLineup,
  getPublicPlans,
  getSurvey,
  WeaponAsset,
} from "@/lib/get-data";
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
  weapons,
}: {
  date: string;
  house: string;
  units: Unit[];
  lineupName: string | null;
  artillery: ArtilleryAsset[];
  weapons: WeaponAsset[];
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
  const { data: plan } = useQuery({
    queryKey: ["plan", name],
    queryFn: () => getPublicPlans(house, name),
    enabled: !!name,
  });
  const [currentPlan, setCurrentPlan] = useState<Plan>(DEFAULT_PLAN);
  useEffect(() => {
    if (!!plan) {
      setCurrentPlan(plan.layers[0]);
    }
  }, [!!plan]);

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
          className="flex self-center flex-col"
        >
          {!!plan && currentPlan.map !== "" ? (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">
                {currentPlan.title !== ""
                  ? currentPlan.title
                  : "Untitled Layer"}
              </h2>
              <div className="flex">
                <p className="w-[150px] break-words whitespace-pre-wrap">
                  {currentPlan.description}
                </p>
                <MapEditor
                  lineup={e}
                  plan={currentPlan}
                  currentTool={{ ...DEFAULT_TOOLS_CONFIG, tool: "text" }}
                  onPlanChange={setCurrentPlan}
                />
                <div className="flex flex-col items-center mt-4 w-[150px]">
                  {plan.layers.length > 1 ? (
                    <>
                      <h3 className="text-xl font-semibold mb-2">Layers</h3>
                      <div className="flex gap-2 flex-col">
                        {plan.layers.map((layer, i) => (
                          <Button
                            key={i}
                            variant={
                              currentPlan.title === layer.title
                                ? "custom"
                                : "default"
                            }
                            onClick={() => setCurrentPlan(layer)}
                          >
                            {layer.title !== ""
                              ? layer.title
                              : "Untitled Layer"}
                          </Button>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
          <Preview
            weapons={weapons}
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
