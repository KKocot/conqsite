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
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const t = useTranslations("MyHouse");
  const [inputQuery, setInputQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"level" | "update">("level");

  const updateHouseAssets = useUpdateAssetsMutation();
  const filteredData = useMemo(() => {
    const filtered = surveysData.filter((value) => {
      const searchWord = inputQuery.toLowerCase();
      const countryName = value.inGameNick.toLowerCase();
      return countryName.includes(searchWord);
    });

    if (sortBy === "level") {
      return [...filtered].sort(
        (a, b) => Number(b.characterLevel) - Number(a.characterLevel)
      );
    }

    return [...filtered].sort((a, b) => {
      if (a.updates?.length && b.updates?.length) {
        return (
          new Date(b.updates[b.updates.length - 1].toString()).getTime() -
          new Date(a.updates[a.updates.length - 1].toString()).getTime()
        );
      }
      if (!a.updates?.length && !b.updates?.length) return 0;
      if (!a.updates?.length) return 1;
      return -1;
    });
  }, [surveysData, inputQuery, sortBy]);

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
          <Label htmlFor="visible">{t("visible")}</Label>
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
      <div className="flex justify-center mt-4 gap-4">
        <Label>Sort By: </Label>
        <RadioGroup
          defaultValue="level"
          value={sortBy}
          onValueChange={(value) => setSortBy(value as "level" | "update")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="level" id="sort-level" />
            <Label htmlFor="sort-level">Level</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="update" id="sort-update" />
            <Label htmlFor="sort-update">Last Update</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex gap-4 p-4 flex-wrap">
        {filteredData.map((e) => (
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
