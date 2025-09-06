"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Content from "./content";
import {
  getSubSurves,
  getSurvey,
  getUnitsAssets,
  getWeaponsAssets,
  Survey,
} from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import useDeleteSubSurvey from "@/components/hooks/use-delete-sub-survey";

export default function Page() {
  const { data: user } = useSession();
  const [survey, setSurvey] = useState<Survey | undefined>(undefined);
  const { data, isLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const { data: weaponsAssets, isLoading: weaponsAssetsLoading } = useQuery({
    queryKey: ["weaponsAssets"],
    queryFn: () => getWeaponsAssets(),
  });
  const { data: mainProfile, isLoading: profileIsLoading } = useQuery({
    queryKey: ["mainProfile", user?.user.id],
    queryFn: () => getSurvey(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });
  const { data: subProfilesData } = useQuery({
    queryKey: ["subProfile", user?.user.id],
    queryFn: () => getSubSurves(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });

  useEffect(() => {
    if (mainProfile) {
      setSurvey(mainProfile);
    }
  }, [mainProfile]);
  const deleteSubSurvey = useDeleteSubSurvey();
  if (isLoading || weaponsAssetsLoading) return <LoadingComponent />;
  if (!data || !weaponsAssets) return <NoData />;

  return (
    <div className="flex flex-col w-full">
      {subProfilesData && mainProfile ? (
        <div className="flex flex-wrap gap-3 p-4">
          {[mainProfile, ...subProfilesData].map((e, i) => (
            <Card key={i}>
              <CardHeader className="text-xl font-bold text-center">
                {`${e.inGameNick}${i === 0 ? "(main)" : ""}`}
              </CardHeader>
              <Button
                variant="custom"
                className="min-w-[200px] flex items-center justify-center p-4 text-lg font-medium rounded-lg shadow-md transition-colors"
                onClick={() => {
                  setSurvey(e);
                }}
              >
                View Profile
              </Button>
              {i !== 0 ? (
                <Button
                  variant="destructive"
                  className="min-w-[200px] flex items-center justify-center p-4 text-lg font-medium rounded-lg shadow-md transition-colors"
                  onClick={() => deleteSubSurvey.mutate(e.discordNick)}
                  disabled={deleteSubSurvey.isPending}
                >
                  Delete Profile
                </Button>
              ) : null}
            </Card>
          ))}
        </div>
      ) : null}

      <Content
        unitsAssets={data}
        weapons={weaponsAssets}
        profileData={survey}
        profileIsLoading={profileIsLoading}
      />
    </div>
  );
}
