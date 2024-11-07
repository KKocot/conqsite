"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_FORM_DATA } from "@/components/wizard-form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loading from "react-loading";
import { useRouter } from "next/navigation";
import { getHousesDetails, getSurvey, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export interface HouseProps {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}

const servers = ["EU1", "EU2", "EU3", "EU4", "CBL", "NA1", "NA2"];

const CreateHousePage = () => {
  const { data: user } = useSession();
  const t = useTranslations("HousePage");
  const [house, setHouse] = useState<HouseProps>({
    name: "",
    description: "",
    country: "",
    discordLink: "",
    avatar: "",
    server: "",
  });
  const router = useRouter();
  const { data: surveyData, isLoading: surveyIsLoading } = useQuery({
    queryKey: ["profile", user?.user.id],
    queryFn: () => getSurvey(user?.user.id ?? ""),
    enabled: !!user?.user.id,
  });
  const { data: housesData, isLoading: housesIsLoading } = useQuery({
    queryKey: ["houses"],
    queryFn: getHousesDetails,
  });
  const unavailableHouseNames = housesData
    ? [...housesData.map((house) => house.name), "none"]
    : ["none"];

  const validation = {
    isHouseNameAvailable: unavailableHouseNames.includes(house.name),
    descriptionTooLong: house.description.length > 250,
    wrongDiscordLink:
      house.discordLink.length > 0 && !house.discordLink.includes("discord.gg"),
    countryTooLong: house.country.length > 20,
    serverRequired: !house.server,
  };
  const handleAllActions = async () => {
    const survey = surveyData ?? DEFAULT_FORM_DATA;
    const data = {
      ...survey,
      discordNick: user?.user.name,
      characterLevel: survey?.characterLevel ?? "0",
      discordId: user?.user.id,
      avatar: survey.avatar === "" ? user?.user.image : survey.avatar,
      house: Array.isArray(survey.house)
        ? [...survey.house, house.name]
        : [survey.house === "none" ? null : survey.house, house.name],
    };
    try {
      // Submit survey data
      let response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred in survey submission:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Survey submission success:", responseData);
      }

      // Add role
      response = await fetch(`/api/roles?house=${house.name}`, {
        method: "POST",
        body: JSON.stringify({
          discordNick: user?.user.name,
          discordId: user?.user.id,
          house: house.name,
          role: "HouseLeader",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred in adding role:", errorData);
      } else {
        console.log("Role addition success:", await response.json());
      }

      // Create house
      response = await fetch("/api/house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(house),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred in house creation:", errorData);
      } else {
        const responseData = await response.json();
        console.log("House creation success:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      router.push(`/house`);
    }
  };

  if (surveyIsLoading || housesIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>{t("create_house")}</h1>
      <div>
        <Label>{t("house_name")}</Label>
        <Input
          value={house.name}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {validation.isHouseNameAvailable ? (
          <p>{t("house_name_is_not_available")}</p>
        ) : null}
      </div>
      <div>
        <Label>{t("house_description_title")}</Label>
        <Textarea
          value={house.description}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        {validation.descriptionTooLong ? (
          <p>{t("description_is_too_long")}</p>
        ) : null}
      </div>
      <div>
        <Label>{t("country")}</Label>
        <Input
          value={house.country}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, country: e.target.value }))
          }
        />
        {validation.countryTooLong ? <p>Too long message</p> : null}
      </div>
      <div>
        <Label>{t("discord_link")}</Label>
        <Input
          value={house.discordLink}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, discordLink: e.target.value }))
          }
        />
        {validation.wrongDiscordLink ? (
          <p>{t("discord_link_is_incorrect")}</p>
        ) : null}
      </div>
      <div>
        <Label>{t("avatar")}</Label>
        <Input
          value={house.avatar}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, avatar: e.target.value }))
          }
        />
      </div>

      <div>
        <Label>{t("server")}</Label>
        <Select
          value={house.server}
          onValueChange={(e) => setHouse((prev) => ({ ...prev, server: e }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a server" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {servers.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {validation.serverRequired ? <p>Pick server</p> : null}
      </div>
      <Button
        disabled={
          validation.isHouseNameAvailable ||
          validation.descriptionTooLong ||
          validation.wrongDiscordLink ||
          validation.countryTooLong ||
          validation.serverRequired ||
          !house.name ||
          !house.server
        }
        className="m-6"
        onClick={() => handleAllActions()}
      >
        {t("create_house")}
      </Button>
    </div>
  );
};
export default CreateHousePage;
// TODO translate
