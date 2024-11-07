"use client";
import { Button } from "@/components/ui/button";
import { getSurvey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import Loading from "react-loading";
import Content from "./content";

import { rolesQueryOptions } from "@/queries/roles.query";

const HousePage = () => {
  const { data: user_data } = useSession();

  const t = useTranslations("HousePage");
  const { data: surveyData, isLoading: surveyIsLoading } = useQuery({
    queryKey: ["house", user_data?.user.id],
    queryFn: () => getSurvey(user_data?.user.id ?? ""),
    enabled: !!user_data?.user.id,
  });
  const [house, setHouse] = useState<string | undefined>(undefined);

  const defaultHouse =
    Array.isArray(surveyData?.house) && surveyData?.house.length === 1
      ? surveyData.house[0]
      : typeof surveyData?.house === "string"
      ? surveyData.house
      : false;

  const { data: command_list = [] } = useQuery(rolesQueryOptions());
  const allowed_to_delete = command_list.some(
    (e) => e.discordId === user_data?.user.id
  );
  if (surveyIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  if (!surveyData) {
    return (
      <div className="flex justify-evenly p-4">
        <Button>
          <Link href="/update-form">Update Form</Link>
        </Button>
      </div>
    );
  }
  if (surveyData.house.length === 0 || surveyData.house === "none") {
    return (
      <div className="flex justify-evenly p-4">
        <Link href="/houses">
          <Button>{t("join_house")}</Button>
        </Link>
        <Button>
          <Link href="/create-house">{t("create_house")}</Link>
        </Button>
      </div>
    );
  }
  return defaultHouse ? (
    <div>
      <Content house={defaultHouse} canDelete={allowed_to_delete} />
    </div>
  ) : !house ? (
    <div className="gap-4 flex mt-40 flex-col items-center">
      <h1 className="text-2xl font-blod">Choose a house</h1>
      <div className="flex gap-4">
        {Array.isArray(surveyData.house)
          ? surveyData.house.map((e) => (
              <Button onClick={() => setHouse(e)} className="w-full" key={e}>
                {e}
              </Button>
            ))
          : null}
      </div>
    </div>
  ) : (
    <Content house={house} canDelete={allowed_to_delete} />
  );
};
export default HousePage;
// TODO translation
