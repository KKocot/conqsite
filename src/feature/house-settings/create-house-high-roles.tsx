"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import { Badge } from "../../components/ui/badge";
import { DiscordUsersProps, Roles } from "@/lib/get-data";
import { ConfigProps } from "@/app/(protected)/member/create-house/content";
import { HighRolesValues } from "@/app/(protected)/(owner)/settings/high-roles/[param]/content";
import { useTranslations } from "next-intl";

interface CreateHouseHighRolesProps {
  type: "create";
  handleStep: (e: number) => void;
  discordUsers: DiscordUsersProps;
  values: ConfigProps;
  setValues: Dispatch<SetStateAction<ConfigProps>>;
  onAdd?: never;
  onDelete?: never;
  premium?: never;
}

interface EditHouseHighRolesProps {
  type: "edit";
  handleStep?: never;
  discordUsers: DiscordUsersProps;
  values: HighRolesValues;
  setValues?: never;
  onAdd: (e: Roles) => void;
  onDelete: (userId: string, house: string) => void;
  premium: boolean;
}

const CreateHouseHighRoles = ({
  type,
  handleStep,
  discordUsers,
  values,
  setValues,
  onAdd,
  onDelete,
  premium,
}: CreateHouseHighRolesProps | EditHouseHighRolesProps) => {
  const house = type === "edit" ? values.houseLeader[0].house : "";
  const t = useTranslations("Settings");
  return (
    <Card>
      <CardHeader className="text-center text-2xl font-bold">
        {t("high_roles.manage_commands")}
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <h2 className="text-center text-lg font-bold p-6">
          {t("high_roles.house_leader")}
        </h2>
        <div className="grid grid-cols-3 gap-4 p-6">
          <div />
          {type === "edit" ? (
            <div className="grid grid-cols-1 gap-5">
              {values.houseLeader
                .filter((e) => e.discordId !== "303156898532818944")
                .map((user) => (
                  <Badge
                    key={user.discordId}
                    className="text-base h-8 flex justify-between"
                  >
                    <div />
                    <p>{user.discordNick}</p>
                    <div />
                  </Badge>
                ))}
            </div>
          ) : (
            <Badge className="text-base h-8 flex justify-between">
              <div />
              <p>{t("high_roles.you")}</p>
              <div />
            </Badge>
          )}
          <Card className="py-4">
            <CardHeader className="pt-1">
              {t("high_roles.permissions")}
            </CardHeader>
            <CardContent>
              <li>{t("high_roles.build_team")}</li>
              <li>{t("high_roles.publishing_lineups")}</li>
              <li>{t("high_roles.manage_all_roles")}</li>
              <li>{t("high_roles.manage_house_info")}</li>
              <li>{t("high_roles.manage_house_config")}</li>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <h2 className="text-center text-lg font-bold p-6">
          {t("high_roles.choose_your_right_hand")}
        </h2>
        <div className="grid grid-cols-3 gap-4 p-6">
          <Select
            disabled={values.righthand.length >= (premium ? 2 : 1)}
            onValueChange={(e) => {
              const user = discordUsers.users.find((user) => user.id === e);
              if (type === "edit") {
                onAdd({
                  discordId: user?.id ?? "",
                  house: house,
                  role: "RightHand",
                  discordNick: user?.username ?? "",
                });
              } else {
                setValues((prev) => {
                  if (user) {
                    return {
                      ...prev,
                      righthand: [...prev.righthand, user],
                    };
                  }
                  return prev;
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={t("high_roles.choose_right_hand_placeholder")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {discordUsers.users.map((e, i) => (
                  <SelectItem
                    key={i + "righthand"}
                    value={e.id}
                    disabled={
                      type === "edit"
                        ? !![...values.highcommand, ...values.righthand].find(
                            (user) => user.discordId === e.id
                          )
                        : !![...values.highcommand, ...values.righthand].find(
                            (user) => user.id === e.id
                          )
                    }
                  >
                    {e.username}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="grid grid-cols-1 gap-5">
            {type === "edit"
              ? values.righthand.map((user) => (
                  <Badge
                    key={user.discordId}
                    className="text-base h-8 flex justify-between"
                  >
                    <div className="w-5" />
                    <p>{user.discordNick}</p>
                    <Button
                      className="h-7"
                      onClick={() => onDelete(user.discordId, user.house)}
                    >
                      X
                    </Button>
                  </Badge>
                ))
              : values.righthand.map((user) => (
                  <Badge
                    key={user.id}
                    className="text-base h-8 flex justify-between"
                  >
                    <div className="w-5" />
                    <p>{user.username}</p>
                    <Button
                      className="h-7"
                      onClick={() =>
                        setValues((prev) => ({
                          ...prev,
                          righthand: prev.righthand.filter(
                            (selectedUser) => selectedUser.id !== user.id
                          ),
                        }))
                      }
                    >
                      X
                    </Button>
                  </Badge>
                ))}
          </div>
          <Card className="py-4">
            <CardHeader className="pt-1">
              {t("high_roles.permissions")}
            </CardHeader>
            <CardContent>
              <li>{t("high_roles.build_team")}</li>
              <li>{t("high_roles.publishing_lineups")}</li>
              <li>{t("high_roles.manage_commands")}</li>
              <li>{t("high_roles.manage_house_info")}</li>
              <li>{t("high_roles.manage_house_config")}</li>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <h2 className="text-center text-lg font-bold p-6">
          {t("high_roles.choose_your_commanders")}
        </h2>
        <p></p>
        <div className="grid grid-cols-3 gap-4 p-6">
          <Select
            disabled={values.highcommand.length >= (premium ? 6 : 3)}
            onValueChange={(e) => {
              const user = discordUsers.users.find((user) => user.id === e);
              if (type === "edit") {
                onAdd({
                  discordId: user?.id ?? "",
                  house: house,
                  role: "HighCommand",
                  discordNick: user?.username ?? "",
                });
              } else {
                setValues((prev) => {
                  if (user) {
                    return {
                      ...prev,
                      highcommand: [...prev.highcommand, user],
                    };
                  }
                  return prev;
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={t("high_roles.choose_commanders_placeholder")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {discordUsers.users.map((e, i) => (
                  <SelectItem
                    key={i + "command"}
                    value={e.id}
                    disabled={
                      type === "edit"
                        ? !![...values.highcommand, ...values.righthand].find(
                            (user) => user.discordId === e.id
                          )
                        : !![...values.highcommand, ...values.righthand].find(
                            (user) => user.id === e.id
                          )
                    }
                  >
                    {e.username}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-5 h-36">
            {type === "edit"
              ? values.highcommand.map((user) => (
                  <Badge
                    key={user.discordId}
                    className="text-base h-8 flex justify-between"
                  >
                    <div />
                    <p>{user.discordNick}</p>
                    <Button
                      className="h-7"
                      onClick={() => onDelete(user.discordId, user.house)}
                    >
                      X
                    </Button>
                  </Badge>
                ))
              : values.highcommand.map((user) => (
                  <Badge
                    key={user.id}
                    className="text-base h-8 flex justify-between"
                  >
                    <div />
                    <p>{user.username}</p>
                    <Button
                      className="h-7"
                      onClick={() =>
                        setValues((prev) => ({
                          ...prev,
                          highcommand: prev.highcommand.filter(
                            (selectedUser) => selectedUser.id !== user.id
                          ),
                        }))
                      }
                    >
                      X
                    </Button>
                  </Badge>
                ))}
          </div>
          <Card className="py-4">
            <CardHeader className="pt-1">
              {t("high_roles.permissions")}
            </CardHeader>
            <CardContent>
              <li>{t("high_roles.build_team")}</li>
              <li>{t("high_roles.publishing_lineups")}</li>
            </CardContent>
          </Card>
        </div>

        {type === "edit" ? null : (
          <div className="flex justify-between w-full">
            <Button variant="custom" onClick={() => handleStep(2)}>
              {t("previous")}
            </Button>
            <Button
              className="self-end"
              variant="custom"
              onClick={() => handleStep(4)}
            >
              {t("next")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateHouseHighRoles;
