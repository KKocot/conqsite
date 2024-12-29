import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Info, Link2 } from "lucide-react";
import { Tooltip, TooltipProvider } from "../../components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import Image from "next/image";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { DiscordProps, getDiscordData } from "@/lib/get-data";
import {
  ConfigProps,
  DiscordDataProps,
} from "@/app/(protected)/member/create-house/content";
import { EditConfigProps } from "@/app/(protected)/(owner)/settings/bot-config/[param]/content";
import { useTranslations } from "next-intl";

export interface CreateHouse {
  guild_id: string;
  tw_discord: string;
  anotherDC: boolean;
}
interface CreateProps {
  type: "create";
  creatorId: string;
  handleDiscord: Dispatch<SetStateAction<DiscordDataProps>>;
  handleStep: Dispatch<SetStateAction<number>>;
  handlerGeneral: Dispatch<SetStateAction<ConfigProps>>;
  configValues?: never;
}

interface EditProps {
  type: "edit";
  creatorId: string;
  handleDiscord: Dispatch<SetStateAction<DiscordDataProps>>;
  handleStep: Dispatch<SetStateAction<number>>;
  handlerGeneral: Dispatch<SetStateAction<EditConfigProps>>;
  configValues: EditConfigProps;
}
const CreateHouseDiscordServers = ({
  type,
  creatorId,
  handleDiscord,
  handleStep,
  handlerGeneral,
  configValues,
}: CreateProps | EditProps) => {
  const t = useTranslations("Settings");
  const [values, setValues] = useState<CreateHouse>({
    guild_id: configValues?.guild_id ?? "",
    tw_discord: configValues?.tw_discord ?? "",
    anotherDC:
      configValues?.tw_discord === configValues?.guild_id ? false : true,
  });
  const onSubmit = async () => {
    const data: DiscordProps = await getDiscordData(creatorId, values);
    handleDiscord((prev) => ({ ...prev, lists: data }));
    if (data.status === "ok") {
      handleStep(2);
      if (type === "edit") {
        handlerGeneral((prev) => ({ ...prev, guild_id: values.guild_id }));
      } else {
        handlerGeneral((prev) => ({ ...prev, guild_id: values.guild_id }));
      }
    }
    if (data.status === "error") {
      alert(data.error);
    }
  };
  return (
    <Card>
      <CardHeader className="text-center text-2xl font-bold">
        {t("verification.discord_verification")}
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <div className="flex p-12 justify-around gap-4">
          <div>
            <div>{t("verification.house_id")}</div>
            <div className="flex gap-2">
              {t("verification.get_id")}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background z-50">
                    <div className="flex">
                      <div className="flex flex-col items-center">
                        <p>{t("verification.tooltip_one")}</p>
                        <Image
                          src="https://i.imgur.com/yT4pD80.png"
                          alt="user settings"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p>{t("verification.tooltip_two")}n</p>
                        <Image
                          src="https://i.imgur.com/vF0rX4b.png"
                          alt="advanced"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p>{t("verification.tooltip_three")}</p>
                        <Image
                          src="https://i.imgur.com/2O6V41u.png"
                          alt="copy server id"
                          width={200}
                          height={500}
                        />
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              {t("verification.point_one")}
              <Link
                className="gap-1 text-red-600"
                href="https://discord.com/oauth2/authorize?client_id=1002261855718342759&permissions=8&integration_type=0&scope=bot"
                target="_blank"
              >
                <Link2 className="inline-block" /> Konquerus
              </Link>{" "}
              {t("verification.point_two")}
            </div>
            <div>{t("verification.point_three")}</div>
            <br />
            <div>
              {t("verification.point_four")}
              <Link
                className="gap-1 text-red-600 inline-block "
                href="https://discord.com/oauth2/authorize?client_id=1002261855718342759&permissions=8&integration_type=0&scope=bot"
                target="_blank"
              >
                <Link2 className="inline-block" /> Konquerus
              </Link>{" "}
              {t("verification.point_five")}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <Label htmlFor="discordId">{t("verification.discord_id")}</Label>
              <Input
                id="discordId"
                value={values.guild_id}
                className="w-64"
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    guild_id: e.target.value,
                  }))
                }
              />
            </div>
            {values.anotherDC ? (
              <div>
                <Label htmlFor="twdiscordId">
                  {t("verification.tw_discord_id")}
                </Label>
                <Input
                  id="twdiscordId"
                  value={values.tw_discord}
                  className="w-64"
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      tw_discord: e.target.value,
                    }))
                  }
                />
              </div>
            ) : null}
            <div className="flex justify-between items-center">
              <Label htmlFor="anotherDC">
                {t("verification.tw_discord_id")}
              </Label>
              <Checkbox
                id="anotherDC"
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    anotherDC: !prev.anotherDC,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <Button
          disabled={
            values.guild_id === "" ||
            (values.anotherDC && values.tw_discord === "")
          }
          className="self-end"
          variant="custom"
          onClick={onSubmit}
        >
          {t("next")}
        </Button>
      </CardContent>
    </Card>
  );
};
export default CreateHouseDiscordServers;
