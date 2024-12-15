"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import { Badge } from "./ui/badge";
import { DiscordUsersProps } from "@/lib/get-data";
import { CommandersProps } from "@/app/(protected)/create-house/content";

const CreateHouseHighRoles = ({
  handleStep,
  discordUsers,
  values,
  setValues,
}: {
  handleStep: (e: number) => void;
  discordUsers: DiscordUsersProps;
  values: CommandersProps;
  setValues: Dispatch<SetStateAction<CommandersProps>>;
}) => {
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
          <Badge className="text-base h-8 flex justify-between">
            <div />
            <p>You</p>
            <div />
          </Badge>
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
          From commanders choose your Right Hand
        </h2>
        <div className="grid grid-cols-3 gap-4 p-6">
          <Select
            disabled={values.righthand.length >= 1}
            onValueChange={(e) =>
              setValues((prev) => {
                const user = discordUsers.users.find((user) => user.id === e);
                if (user) {
                  return {
                    ...prev,
                    righthand: [...prev.righthand, user],
                  };
                }
                return prev;
              })
            }
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
                      !![...values.highcommand, ...values.righthand].find(
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
            {values.righthand.map((user) => (
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
          Choose your 3 commanders
        </h2>
        <p></p>
        <div className="grid grid-cols-3 gap-4 p-6">
          <Select
            disabled={values.highcommand.length >= 3}
            onValueChange={(e) =>
              setValues((prev) => {
                const user = discordUsers.users.find((user) => user.id === e);
                if (user) {
                  return {
                    ...prev,
                    highcommand: [...prev.highcommand, user],
                  };
                }
                return prev;
              })
            }
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
                      !![...values.highcommand, ...values.righthand].find(
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
            {values.highcommand.map((user) => (
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
      </CardContent>
    </Card>
  );
};

export default CreateHouseHighRoles;
