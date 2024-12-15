"use client";

import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import HouseCard from "./house-card";
import { useState } from "react";
import { servers } from "@/lib/utils";

export interface HouseProps {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}
const CreateHouseCard = () => {
  const t = useTranslations("HousePage");
  const [house, setHouse] = useState<HouseProps>({
    name: "",
    description: "",
    country: "",
    discordLink: "",
    avatar: "",
    server: "",
  });
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
              <Label htmlFor="housename">{t("house_name")}</Label>
              <Input
                id="housename"
                value={house.name}
                onChange={(e) => setHouse({ ...house, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="housedescription">
                {t("house_description_title")}
              </Label>
              <Textarea
                id="housedescription"
                value={house.description}
                onChange={(e) =>
                  setHouse({ ...house, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="country">{t("country")}</Label>
              <Input
                id="country"
                value={house.country}
                onChange={(e) =>
                  setHouse({ ...house, country: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="discordlink">{t("discord_link")}</Label>
              <Input
                id="discordlink"
                value={house.discordLink}
                onChange={(e) =>
                  setHouse({ ...house, discordLink: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="houseimage">{t("avatar")}</Label>
              <Input
                id="houseimage"
                value={house.avatar}
                onChange={(e) => setHouse({ ...house, avatar: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="servers">{t("server")}</Label>
              <Select
                value={house.server}
                onValueChange={(e) => setHouse({ ...house, server: e })}
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
            <HouseCard house={house} />
          </div>
        </div>
        <Button className="self-end" variant="custom">
          Next
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateHouseCard;
