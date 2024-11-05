"use client";
import { Button } from "@/components/ui/button";
import { getHouseDetails, getSurvey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Loading from "react-loading";

const HousePage = () => {
  const { data: user_data } = useSession();
  const t = useTranslations("HousePage");
  const { data: surveyData, isLoading: surveyIsLoading } = useQuery({
    queryKey: ["house", user_data?.user.id],
    queryFn: () => getSurvey(user_data?.user.id ?? ""),
    enabled: !!user_data?.user.id,
  });
  // const { data: houseData, isLoading: houseIsLoading } = useQuery({
  //   queryKey: ["house", surveyData?.house],
  //   queryFn: () => getHouseDetails(more_houses? surveyData?.house ),
  //   enabled: !!surveyData?.house,
  // });

  if (surveyIsLoading)
    if (surveyIsLoading)
      return (
        <div className="flex justify-center items-center h-screen">
          <Loading color="#94a3b8" />
        </div>
      );

  return (
    <div>
      {surveyData ? (
        <div className="flex min-h-screen">
          <div className="flex flex-col items-center w-1/6 gap-2 shadow-lg shadow-primary-foreground min-h-screen">
            <ul className="flex flex-col items-center gap-2 m-4">
              {Array.isArray(surveyData.house) ? (
                surveyData.house.map((e) => <li key={e}>{e}</li>)
              ) : (
                <li>{surveyData.house}</li>
              )}
            </ul>
          </div>
          <div className="w-5/6 ">
            <div>{t("next_tw_preview")}</div>
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly p-4">
          <Link href="/houses">
            <Button>{t("join_house")}</Button>
          </Link>
          <Button>
            <Link href="/create-house">{t("create_house")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default HousePage;
