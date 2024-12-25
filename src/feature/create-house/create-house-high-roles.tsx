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

interface CreateHouseHighRolesProps {
  type: "create";
  handleStep: (e: number) => void;
  discordUsers: DiscordUsersProps;
  values: ConfigProps;
  setValues: Dispatch<SetStateAction<ConfigProps>>;
  onAdd?: never;
  onDelete?: never;
}

interface EditHouseHighRolesProps {
  type: "edit";
  handleStep?: never;
  discordUsers: DiscordUsersProps;
  values: HighRolesValues;
  setValues?: never;
  onAdd: (e: Roles) => void;
  onDelete: (userId: string, house: string) => void;
}

const CreateHouseHighRoles = ({
  type,
  handleStep,
  discordUsers,
  values,
  setValues,
  onAdd,
  onDelete,
}: CreateHouseHighRolesProps | EditHouseHighRolesProps) => {
  const house = type === "edit" ? values.houseLeader[0].house : "";
  return (
    <Card>
      <CardHeader className="text-center text-2xl font-bold">
        Pick Your Commanders
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <h2 className="text-center text-lg font-bold p-6">House Leader</h2>
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
              <p>You</p>
              <div />
            </Badge>
          )}
          <Card className="py-4">
            <CardHeader className="pt-1">Permissions:</CardHeader>
            <CardContent>
              <li>Build Teams</li>
              <li>Publishing Lineups</li>
              <li>Manage all roles</li>
              <li>Manage house info</li>
              <li>Manage house config</li>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <h2 className="text-center text-lg font-bold p-6">
          Choose your Right Hand
        </h2>
        <div className="grid grid-cols-3 gap-4 p-6">
          <Select
            disabled={values.righthand.length >= 1}
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
              <SelectValue placeholder="Choose Right Hand" />
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
            <CardHeader className="pt-1">Permissions:</CardHeader>
            <CardContent>
              <li>Build Teams</li>
              <li>Publishing Lineups</li>
              <li>Manage command roles</li>
              <li>Manage house info</li>
              <li>Manage house config</li>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <h2 className="text-center text-lg font-bold p-6">
          Choose your 3 Commanders
        </h2>
        <p></p>
        <div className="grid grid-cols-3 gap-4 p-6">
          <Select
            disabled={values.highcommand.length >= 3}
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
              <SelectValue placeholder="Choose Commanders" />
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
            <CardHeader className="pt-1">Permissions:</CardHeader>
            <CardContent>
              <li>Build Teams</li>
              <li>Publishing Lineups</li>
            </CardContent>
          </Card>
        </div>

        {type === "edit" ? null : (
          <div className="flex justify-between w-full">
            <Button variant="custom" onClick={() => handleStep(2)}>
              Previes
            </Button>
            <Button
              className="self-end"
              variant="custom"
              onClick={() => handleStep(4)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateHouseHighRoles;
