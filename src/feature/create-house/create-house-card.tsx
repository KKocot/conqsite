"use client";

import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import HouseCard from "../../components/house-card";
import { servers } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Info } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { getHousesDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { ConfigProps } from "@/app/(protected)/create-house/content";

const CreateHouseCard = ({
  values,
  setValues,
  handleStep,
  onSubmit,
}: {
  values: ConfigProps;
  setValues: Dispatch<SetStateAction<ConfigProps>>;
  handleStep: (e: number) => void;
  onSubmit: () => void;
}) => {
  const t = useTranslations("HousePage");
  const { data: housesData } = useQuery({
    queryKey: ["houses"],
    queryFn: getHousesDetails,
  });
  const validation = {
    isHouseNameAvailable: housesData
      ? [
          ...housesData.map((house) => house.name.toLocaleLowerCase()),
          "none",
        ].includes(values.name.toLocaleLowerCase())
      : ["none"].includes(values.name.toLocaleLowerCase()),
    nameTooLong: values.name.length > 20,
    descriptionTooLong: values.description.length > 45,
    wrongDiscordLink:
      values.discordLink.length > 0 &&
      !values.discordLink.includes("discord.gg"),
    countryTooLong: values.country.length > 20,
    serverRequired: !values.server,
  };
  return (
    <Card>
      <CardHeader className="text-center text-2xl font-bold">
        House Card Details
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <div className="flex w-full justify-between py-6">
          <div className="flex flex-col w-1/2">
            <div>
              <Label htmlFor="housename">
                {t("house_name")}
                <InfoTooltip info="House Name should be unique and not longer them 20 character" />
              </Label>
              <Input
                id="housename"
                value={values.name}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="housedescription">
                {t("house_description_title")}
                <InfoTooltip info="House Description is required, not offensive to others and not longer them 45 characters" />
              </Label>
              <Textarea
                id="housedescription"
                value={values.description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="country">
                {t("country")}
                <InfoTooltip info="Country e.g. 'Poland', 'UK' or maybe 'International'" />
              </Label>
              <Input
                id="country"
                value={values.country}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, country: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="discordlink">
                {t("discord_link")}
                <InfoTooltip info="Discord Link for your house discord server" />
              </Label>
              <Input
                id="discordlink"
                value={values.discordLink}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    discordLink: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="houseimage">
                {t("avatar")}
                <InfoTooltip info="Image url address. I recommend to use free imagehoster like https://imgur.com/ to upload your house Image. DONT use url from discord images, cause  will disappear after a few  days." />
              </Label>
              <Input
                id="houseimage"
                value={values.avatar}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, avatar: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="servers">
                {t("server")}
                <InfoTooltip info="Where users can find your house" />
              </Label>
              <Select
                value={values.server}
                onValueChange={(e) =>
                  setValues((prev) => ({ ...prev, server: e }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a server" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {servers.map((e) => (
                      <SelectItem value={e} key={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <HouseCard house={values} />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Button variant="custom" onClick={() => handleStep(3)}>
            Previes
          </Button>
          {validation.isHouseNameAvailable ? (
            <p className="text-red-500">House Name is already taken</p>
          ) : validation.nameTooLong ? (
            <p className="text-red-500">House Name is too long</p>
          ) : validation.descriptionTooLong ? (
            <p className="text-red-500">Description is too long</p>
          ) : validation.wrongDiscordLink ? (
            <p className="text-red-500">Discord link is invalid</p>
          ) : validation.countryTooLong ? (
            <p className="text-red-500">Country name is too long</p>
          ) : validation.serverRequired ? (
            <p className="text-red-500">Server is required</p>
          ) : null}
          <Button
            disabled={
              !values.name ||
              !values.description ||
              !values.country ||
              !values.discordLink ||
              !values.avatar ||
              !values.server ||
              validation.isHouseNameAvailable ||
              validation.nameTooLong ||
              validation.descriptionTooLong ||
              validation.wrongDiscordLink ||
              validation.countryTooLong ||
              validation.serverRequired
            }
            className="self-end"
            variant="custom"
            onClick={onSubmit}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateHouseCard;

const InfoTooltip = ({ info }: { info: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="m-1 inline-block cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
