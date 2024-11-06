"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { getPublicLineupDates, getSurvey } from "@/lib/get-data";
import { getCloserDay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo, useState } from "react";
import Loading from "react-loading";
import Content from "./content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rolesQueryOptions } from "@/queries/roles.query";

function getUniqueValues(arr: string[]): string[] {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

const HousePage = () => {
  const { data: user_data } = useSession();
  const next_tw = getCloserDay();

  const t = useTranslations("HousePage");
  const [date, setDate] = useState<Date | undefined>(next_tw);
  const [house, setHouse] = useState<string | undefined>(undefined);
  const { data: surveyData, isLoading: surveyIsLoading } = useQuery({
    queryKey: ["house", user_data?.user.id],
    queryFn: () => getSurvey(user_data?.user.id ?? ""),
    enabled: !!user_data?.user.id,
  });
  const { data: datesData, isLoading: datesIsLoading } = useQuery({
    queryKey: ["lineup dates", "test"],
    queryFn: () => getPublicLineupDates(house ?? ""),
    enabled: !!house,
  });
  const { data: command_list = [] } = useQuery(rolesQueryOptions());
  const allowed_to_delete = command_list.some(
    (e) => e.discordId === user_data?.user.id
  );
  const values = useMemo(() => getUniqueValues(datesData ?? []), [datesData]);
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
  if (surveyData.house.length === 0) {
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

  return (
    <div>
      <div className="flex h-full">
        <div className="flex flex-col items-center w-1/6 gap-2 shadow-lg shadow-accent h-full">
          <div className="flex flex-col items-center gap-2 mt-4 w-full px-4">
            {Array.isArray(surveyData.house) ? (
              surveyData.house.map((e) => (
                <Button onClick={() => setHouse(e)} className="w-full" key={e}>
                  {e}
                </Button>
              ))
            ) : (
              <li>{surveyData.house}</li>
            )}
          </div>
          <div className="w-full px-4">
            <Label htmlFor="date-select">Select Date</Label>
            <Select onValueChange={(value) => setDate(new Date(value))}>
              <SelectTrigger
                id="date-select"
                className="mt-2 p-2 border rounded"
              >
                <SelectValue
                  placeholder={`${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}`}
                />
              </SelectTrigger>
              <SelectContent>
                {values.map((dateValue) => (
                  <SelectItem key={dateValue} value={dateValue}>
                    {dateValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-5/6 ">
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold">{house}</h1>
            {!house || !date ? null : (
              <Content
                canDelete={allowed_to_delete}
                house={house}
                date={`${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HousePage;
// TODO translation
