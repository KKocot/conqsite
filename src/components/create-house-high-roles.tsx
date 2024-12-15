"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { faker } from "@faker-js/faker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
export interface DiscordUsersProps {
  status: "ok" | "error";
  error: string;
  users: { id: string; username: string }[];
}
export const mockDiscordUsers: DiscordUsersProps = {
  status: "ok",
  error: "",
  users: Array.from({ length: 70 }, () => ({
    id: faker.number.int({ min: 1, max: 100000 }).toString(),
    username: faker.internet.userName(),
  })),
};
interface CommandersProps {
  highcommand: { id: string; username: string }[];
  righthand: { id: string; username: string };
}
const CreateHouseHighRoles = ({
  handleStep,
}: {
  handleStep: (e: number) => void;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<CommandersProps>({
    highcommand: [],
    righthand: { id: "", username: "" },
  });
  return (
    <Card>
      <CardHeader className="text-center text-2xl font-bold">
        Pick Your Commanders
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <h2 className="text-center text-lg font-bold">
          Choose your 3 commanders
        </h2>
        <Select
          onValueChange={(e) =>
            setSelectedUsers((prev) => {
              const user = mockDiscordUsers.users.find((user) => user.id === e);
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
              {mockDiscordUsers.users.map((e, i) => (
                <SelectItem key={i + "command"} value={e.id}>
                  {e.username}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          {selectedUsers.highcommand.map((user) => (
            <div key={user.id}>
              <p>{user.username}</p>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-wrap gap-4 justify-evenly py-4">
          {mockDiscordUsers.users.map((user) => (
            <div key={user.id}>
              <Badge
                className={clsx("text-sm cursor-pointer", {
                  "bg-red-500": selectedUsers.highcommand.some(
                    (selectedUser) => selectedUser.id === user.id
                  ),
                })}
                onClick={() => {
                  const isUserSelected = selectedUsers.highcommand.some(
                    (selectedUser) => selectedUser.id === user.id
                  );
                  if (isUserSelected) {
                    setSelectedUsers((prev) => ({
                      ...prev,
                      highcommand: prev.highcommand.filter(
                        (selectedUser) => selectedUser.id !== user.id
                      ),
                    }));
                  } else {
                    setSelectedUsers((prev) => ({
                      ...prev,
                      highcommand: [...prev.highcommand, user],
                    }));
                  }
                }}
              >
                {user.username}
              </Badge>
            </div>
          ))}
        </div> */}
        <Separator />
        <h2 className="text-center text-lg font-bold">
          From commanders choose your Right Hand
        </h2>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Mambers" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {mockDiscordUsers.users.map((e, i) => (
                <SelectItem key={i + "righhand"} value={e.id}>
                  {e.username}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex justify-between w-full">
          <Button variant="custom" onClick={() => handleStep(2)}>
            Previes
          </Button>
          <Button className="self-end" variant="custom">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateHouseHighRoles;
