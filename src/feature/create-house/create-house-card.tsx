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
import { getHousesDetails, HouseDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { ConfigProps } from "@/app/(protected)/member/create-house/content";
import clsx from "clsx";

interface CreateProps {
  type: "create";
  values: ConfigProps;
  setValues: Dispatch<SetStateAction<ConfigProps>>;
  handleStep: (e: number) => void;
  onSubmit: () => void;
}
interface EditProps {
  type: "edit";
  values: HouseDetails;
  setValues: Dispatch<SetStateAction<HouseDetails>>;
  handleStep?: never;
  onSubmit: () => void;
}

const CreateHouseCard = ({
  type,
  values,
  setValues,
  handleStep,
  onSubmit,
}: CreateProps | EditProps) => {
  const t = useTranslations("Settings");
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
        {t("house_card.house_card")}
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <div className="flex w-full justify-between py-6">
          <div className="flex flex-col w-1/2">
            <div>
              <Label htmlFor="housename">
                {t("house_card.name")}
                <InfoTooltip info={t("house_card.name_info")} />
              </Label>
              <Input
                id="housename"
                value={values.name}
                onChange={(e) => {
                  if (type === "edit") {
                    setValues((prev) => ({ ...prev, name: e.target.value }));
                  } else {
                    setValues((prev) => ({ ...prev, name: e.target.value }));
                  }
                }}
                disabled={type === "edit"}
              />
            </div>
            <div>
              <Label htmlFor="housedescription">
                {t("house_card.description")}
                <InfoTooltip info={t("house_card.description_info")} />
              </Label>
              <Textarea
                id="housedescription"
                value={values.description}
                onChange={(e) => {
                  if (type === "edit") {
                    setValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  } else {
                    setValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="country">
                {t("house_card.country")}
                <InfoTooltip info={t("house_card.country_info")} />
              </Label>
              <Input
                id="country"
                value={values.country}
                onChange={(e) => {
                  if (type === "edit") {
                    setValues((prev) => ({ ...prev, country: e.target.value }));
                  } else {
                    setValues((prev) => ({ ...prev, country: e.target.value }));
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="discordlink">
                {t("house_card.link")}
                <InfoTooltip info={t("house_card.link_info")} />
              </Label>
              <Input
                id="discordlink"
                value={values.discordLink}
                onChange={(e) => {
                  if (type === "edit") {
                    setValues((prev) => ({
                      ...prev,
                      discordLink: e.target.value,
                    }));
                  } else {
                    setValues((prev) => ({
                      ...prev,
                      discordLink: e.target.value,
                    }));
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="houseimage">
                {t("house_card.logo")}
                <InfoTooltip info={t("house_card.logo_info")} />
              </Label>
              <Input
                id="houseimage"
                value={values.avatar}
                onChange={(e) => {
                  if (type === "edit") {
                    setValues((prev) => ({ ...prev, avatar: e.target.value }));
                  } else {
                    setValues((prev) => ({ ...prev, avatar: e.target.value }));
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="servers">
                {t("house_card.server")}
                <InfoTooltip info={t("house_card.server_info")} />
              </Label>
              <Select
                value={values.server}
                onValueChange={(e) => {
                  if (type === "edit") {
                    setValues((prev) => ({ ...prev, server: e }));
                  } else {
                    setValues((prev) => ({ ...prev, server: e }));
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
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
        <div
          className={clsx("flex w-full", {
            "justify-between": type === "create",
            "justify-end": type === "edit",
          })}
        >
          {type === "edit" ? null : (
            <Button variant="custom" onClick={() => handleStep(3)}>
              {t("previous")}
            </Button>
          )}
          {validation.isHouseNameAvailable && type !== "edit" ? (
            <p className="text-red-500">{t("house_card.error_one")}</p>
          ) : validation.nameTooLong ? (
            <p className="text-red-500">{t("house_card.error_two")}</p>
          ) : validation.descriptionTooLong ? (
            <p className="text-red-500">{t("house_card.error_three")}</p>
          ) : validation.wrongDiscordLink ? (
            <p className="text-red-500">{t("house_card.error_four")}</p>
          ) : validation.countryTooLong ? (
            <p className="text-red-500">{t("house_card.error_five")}</p>
          ) : validation.serverRequired ? (
            <p className="text-red-500">{t("house_card.error_six")}</p>
          ) : null}
          <Button
            disabled={
              !values.name ||
              !values.description ||
              !values.country ||
              !values.discordLink ||
              !values.avatar ||
              !values.server ||
              (validation.isHouseNameAvailable && type !== "edit") ||
              validation.nameTooLong ||
              validation.descriptionTooLong ||
              validation.wrongDiscordLink ||
              validation.countryTooLong ||
              validation.serverRequired
            }
            variant="custom"
            onClick={onSubmit}
          >
            {type === "edit"
              ? t("house_card.edit_card")
              : t("house_card.submit")}
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
