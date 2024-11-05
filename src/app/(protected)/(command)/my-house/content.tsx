"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/components/user-profile";
import { getSurveys, Survey } from "@/lib/get-data";
import { rolesQueryOptions } from "@/queries/roles.query";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { FC, useState } from "react";
import Loading from "react-loading";

interface ContentProps {
  house: string;
}

const Content: FC<ContentProps> = ({ house }) => {
  const [inputQuery, setInputQuery] = useState<string>("");

  const { data: rolesData, isLoading: rolesIsLoading } = useQuery(
    rolesQueryOptions()
  );

  const { data: surveysData, isLoading: surveysIsLoading } = useQuery({
    queryKey: ["surveysList"],
    queryFn: () => getSurveys(house),
    enabled: !!house,
  });

  if (rolesIsLoading || !rolesData || surveysIsLoading || !surveysData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  const filtredSurveys = surveysData
    ?.sort((a, b) => Number(a.characterLevel) - Number(b.characterLevel))
    .reverse()
    .filter((value) => {
      const searchWord = inputQuery.toLowerCase();
      const countryName = value.inGameNick.toLowerCase();
      if (countryName.includes(searchWord)) {
        return true;
      }
      return false;
    });
  return (
    <div>
      <h1 className="text-5xl font-bold text-center py-10">{house}</h1>
      <div className="flex justify-center">
        <Input
          className="w-3/4"
          onChange={(e) => setInputQuery(e.target.value)}
          value={inputQuery}
        />
      </div>
      <div className="flex gap-4 p-4 flex-wrap">
        {filtredSurveys?.map((e) => (
          <div key={e.discordId}>
            <UserProfile player={e}>
              <Badge
                className={clsx(
                  "cursor-pointer text-md p-2 hover:bg-destructive",
                  {
                    "bg-gray-500": Number(e.characterLevel) === 1,
                    "bg-red-500":
                      Number(e.characterLevel) > 1 &&
                      Number(e.characterLevel) <= 500,
                    "bg-green-500": Number(e.characterLevel) > 500,
                    "bg-blue-500": Number(e.characterLevel) > 1000,
                    "bg-purple-500": Number(e.characterLevel) > 2000,
                    "bg-yellow-500": Number(e.characterLevel) > 3000,
                  }
                )}
              >
                {e.avatar ? (
                  <img
                    src={e.avatar}
                    alt={e.inGameNick}
                    className="w-8 h-8 mr-1 rounded-full"
                  />
                ) : null}
                {e.inGameNick}
              </Badge>
            </UserProfile>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Content;
