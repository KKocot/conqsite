"use client";

import {
  command_whitelist_erebus,
  command_whitelist_kov,
} from "@/assets/whitelists";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/components/user-profile";
import { SurveyProps } from "@/lib/type";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Loading from "react-loading";

const MyHousePage = () => {
  const { data: commander } = useSession();
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState<SurveyProps[]>();
  const [inputQuery, setInputQuery] = useState<string>("");

  const commander_house = command_whitelist_kov.includes(
    commander?.user?.id ?? ""
  )
    ? "KingdomOfPoland"
    : command_whitelist_erebus.includes(commander?.user?.id ?? "")
    ? "Erebus"
    : "";

  const fetchSurveys = async (house: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/survey?house=${house}`);
      const data = await response.json();
      setSurveys(data.surveys);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };
  const filtredSurveys = useMemo(
    () =>
      surveys?.filter((value) => {
        const searchWord = inputQuery.toLowerCase();
        const countryName = value.inGameNick.toLowerCase();
        if (countryName.includes(searchWord)) {
          return true;
        }
        return false;
      }),
    [inputQuery, JSON.stringify(surveys)]
  );
  useEffect(() => {
    fetchSurveys(commander_house);
  }, [commander?.user.id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-5xl font-bold text-center py-10">
        {commander_house}
      </h1>
      <Input
        className="mx-4"
        onChange={(e) => setInputQuery(e.target.value)}
        value={inputQuery}
      />
      <div className="flex gap-4 p-4 flex-wrap">
        {filtredSurveys?.map((e) => (
          <div key={e.discordId}>
            <UserProfile player={e}>
              <Badge className="cursor-pointer text-md p-2 hover:bg-destructive">
                {e.inGameNick}
              </Badge>
            </UserProfile>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyHousePage;
