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
import HouseCard from "./house-card";
import { servers } from "@/lib/utils";
import { Info } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { getHousesDetails, HouseDetails } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import HoverClickTooltip from "@/components/hover-click-tooltip";
import { ConfigProps } from "@/app/(pages)/(protected)/create-house/content";

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
  const pattern = /^[a-zA-Z0-9 .,!?':;"-]+$/;

  const validation = {
    incorrectName: !pattern.test(values.name),
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
    descriptionIsRequired: !values.description,
    countryIsRequired: !values.country,
    discordLinkIsRequired: !values.discordLink,
    avatarIsRequired: !values.avatar,
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
              <Label
                htmlFor="housename"
                className="flex items-center p-2 gap-2"
              >
                {t("house_card.name")}
                <HoverClickTooltip
                  triggerChildren={<Info />}
                  buttonStyle="rounded-full"
                >
                  {t("house_card.name_info")}
                </HoverClickTooltip>
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
              <Label
                htmlFor="housedescription"
                className="flex items-center p-2 gap-2"
              >
                {t("house_card.description")}
                <HoverClickTooltip
                  triggerChildren={<Info />}
                  buttonStyle="rounded-full"
                >
                  {t("house_card.description_info")}
                </HoverClickTooltip>
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
              <Label htmlFor="country" className="flex items-center p-2 gap-2">
                {t("house_card.country")}
                <HoverClickTooltip
                  triggerChildren={<Info />}
                  buttonStyle="rounded-full"
                >
                  {t("house_card.country_info")}
                </HoverClickTooltip>
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
              <Label
                htmlFor="discordlink"
                className="flex items-center p-2 gap-2"
              >
                {t("house_card.link")}
                <HoverClickTooltip
                  triggerChildren={<Info />}
                  buttonStyle="rounded-full"
                >
                  {t("house_card.link_info")}
                </HoverClickTooltip>
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
              <Label
                htmlFor="houseimage"
                className="flex items-center p-2 gap-2"
              >
                {t("house_card.logo")}
                <HoverClickTooltip
                  triggerChildren={<Info />}
                  contentStyle="max-w-xs"
                  buttonStyle="rounded-full"
                >
                  {t("house_card.logo_info")}
                </HoverClickTooltip>
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
              <Label htmlFor="servers" className="flex items-center p-2 gap-2">
                {t("house_card.server")}
                <HoverClickTooltip
                  triggerChildren={<Info />}
                  buttonStyle="rounded-full"
                >
                  {t("house_card.server_info")}
                </HoverClickTooltip>
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
          <p className="text-red-500">
            {validation.isHouseNameAvailable && type !== "edit"
              ? t("house_card.error_one")
              : validation.incorrectName
              ? 'Name can only contain letters, numbers, and special characters: .,!?":;-"'
              : validation.nameTooLong
              ? t("house_card.error_two")
              : validation.descriptionTooLong
              ? t("house_card.error_three")
              : validation.wrongDiscordLink
              ? t("house_card.error_four")
              : validation.countryTooLong
              ? t("house_card.error_five")
              : validation.serverRequired
              ? t("house_card.error_six")
              : validation.descriptionIsRequired
              ? "Description is required"
              : validation.countryIsRequired
              ? "Country is required"
              : validation.discordLinkIsRequired
              ? "Discord link is required"
              : validation.avatarIsRequired
              ? "Avatar is required"
              : null}
          </p>
          <Button
            disabled={
              !values.name ||
              !values.description ||
              !values.country ||
              !values.discordLink ||
              !values.avatar ||
              !values.server ||
              (validation.isHouseNameAvailable && type !== "edit") ||
              validation.incorrectName ||
              validation.nameTooLong ||
              validation.descriptionTooLong ||
              validation.wrongDiscordLink ||
              validation.countryTooLong ||
              validation.serverRequired ||
              validation.descriptionIsRequired ||
              validation.countryIsRequired ||
              validation.discordLinkIsRequired ||
              validation.avatarIsRequired
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
