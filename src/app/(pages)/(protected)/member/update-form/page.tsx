"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSubSurves, getSurvey, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import NoData from "@/feature/ifs/no-data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Content from "./content";

const Page = () => {
  const { data } = useSession();
  const [surveyData, setSurveyData] = useState<Survey | undefined>(undefined);
  const [surveyType, setSurveyType] = useState<"main" | "sub" | "newSub">(
    "main"
  );
  const { data: profileData, isLoading: loadingProfile } = useQuery({
    queryKey: ["mainProfile", data?.user.id],
    queryFn: () => getSurvey(data?.user.id ?? ""),
    enabled: !!data?.user.id,
  });

  const { data: subProfilesData } = useQuery({
    queryKey: ["subProfile", data?.user.id],
    queryFn: () => getSubSurves(data?.user.id ?? ""),
    enabled: !!data?.user.id,
  });

  useEffect(() => {
    if (profileData) {
      setSurveyData(profileData);
    }
  }, [!!profileData, loadingProfile]);
  if (!data) return <NoData />;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {!!profileData ? (
        <div className="flex flex-wrap gap-3 p-4">
          {subProfilesData
            ? [profileData, ...subProfilesData].map((e, i) => (
                <Button
                  key={i}
                  variant="custom"
                  className="min-w-[200px] flex items-center justify-center p-4 text-lg font-medium rounded-lg shadow-md transition-colors"
                  onClick={() => {
                    setSurveyData(e);
                    setSurveyType(i === 0 ? "main" : "sub");
                  }}
                >
                  {`${e.inGameNick}${i === 0 ? "(main)" : ""}`}
                </Button>
              ))
            : null}
          <Button
            variant="custom"
            onClick={() => {
              setSurveyData(undefined);
              setSurveyType("newSub");
            }}
            className="min-w-[200px] flex items-center justify-center gap-2 p-4 text-lg font-medium rounded-lg shadow-md transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add another Survey
          </Button>
        </div>
      ) : null}
      <Content
        user={{ id: data.user.id, avatar: data.user.image ?? "" }}
        surveyData={surveyData}
        surveyLoading={loadingProfile}
        surveyType={surveyType}
        userHouses={
          typeof profileData?.house === "string"
            ? [profileData.house]
            : Array.isArray(profileData?.house)
            ? profileData.house
            : []
        }
      />
    </div>
  );
};
export default Page;
