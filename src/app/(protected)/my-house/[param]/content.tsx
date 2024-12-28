"use client";

import { useUpdateAssetsMutation } from "@/components/hooks/use-assets-mutation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserProfile } from "@/components/user-profile";
import { HouseAssets, Roles, Survey } from "@/lib/get-data";
import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";

interface ContentProps {
  house: string;
  surveysData: Survey[];
  rolesData: Roles[];
  houseAssets: HouseAssets | null | undefined;
  userId: string;
}

const Content: FC<ContentProps> = ({
  house,
  surveysData,
  rolesData,
  houseAssets,
  userId,
}) => {
  const [inputQuery, setInputQuery] = useState<string>("");
  const updateHouseAssets = useUpdateAssetsMutation();
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
    <div className="w-full">
      {rolesData
        .filter((e) => e.role === "HouseLeader" || e.role === "RightHand")
        .find((e) => e.discordId === userId) ? (
        <div className="flex items-center space-x-2 justify-self-end absolute right-0 top-0 p-4">
          <Switch
            id="visible"
            disabled={updateHouseAssets.status === "pending"}
            checked={houseAssets?.sharedList ?? false}
            onCheckedChange={(e) => {
              updateHouseAssets.mutate({
                name: houseAssets?.name ?? house,
                premium: houseAssets?.premium ?? false,
                sharedList: houseAssets?.sharedList
                  ? !houseAssets.sharedList
                  : true,
                signupBot: houseAssets?.signupBot ?? "konquerus",
              });
            }}
          />
          <Label htmlFor="visible">Visible to Members</Label>
        </div>
      ) : null}
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
                  <Avatar className="w-8 h-8 mr-1 rounded-full">
                    <AvatarImage alt={e.discordNick} src={e.avatar} />
                    <AvatarFallback className="rounded-none">
                      <Image
                        width={32}
                        height={32}
                        src="/logo.png"
                        alt="logo"
                      />
                    </AvatarFallback>
                  </Avatar>
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
