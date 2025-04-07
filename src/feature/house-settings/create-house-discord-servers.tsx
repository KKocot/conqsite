import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "../../components/ui/separator";
import Image from "next/image";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { DiscordProps, getDiscordData, Servers } from "@/lib/get-data";
import { useTranslations } from "next-intl";
import {
  ConfigProps,
  DiscordDataProps,
} from "@/app/(pages)/(protected)/member/create-house/content";
import { EditConfigProps } from "@/app/(pages)/(protected)/(owner)/settings/bot-config/[param]/content";
import clsx from "clsx";

export interface CreateHouse {
  guild_id: string;
  tw_discord: string;
}
interface CreateProps {
  type: "create";
  creatorId: string;
  handleDiscord: Dispatch<SetStateAction<DiscordDataProps>>;
  handleStep: Dispatch<SetStateAction<number>>;
  handlerGeneral: Dispatch<SetStateAction<ConfigProps>>;
  configValues?: never;
  servers: Servers[];
}

interface EditProps {
  type: "edit";
  creatorId: string;
  handleDiscord: Dispatch<SetStateAction<DiscordDataProps>>;
  handleStep: Dispatch<SetStateAction<number>>;
  handlerGeneral: Dispatch<SetStateAction<EditConfigProps>>;
  configValues: EditConfigProps;
  servers: Servers[];
}
const CreateHouseDiscordServers = ({
  servers,
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
  });
  const onSubmit = async () => {
    const data: DiscordProps = await getDiscordData(creatorId, values);
    handleDiscord((prev) => ({ ...prev, lists: data }));
    if (data.status === "ok") {
      handleStep(2);
      if (type === "edit") {
        handlerGeneral((prev) => ({
          ...prev,
          guild_id: values.guild_id,
          tw_member:
            prev.tw_discord === values.tw_discord ? prev.tw_member : "",
          tw_discord: values.tw_discord,
        }));
      } else {
        handlerGeneral((prev) => ({
          ...prev,
          guild_id: values.guild_id,
          tw_member:
            prev.tw_discord === values.tw_discord ? prev.tw_member : "",
          tw_discord: values.tw_discord,
        }));
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
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Main Discord Server</h2>
              <div className="grid grid-cols-2 gap-2">
                {servers.length > 0
                  ? servers.map((server) => (
                      <div
                        key={`MAIN${server.id}`}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          className="hidden"
                          id={`MAIN${server.id}`}
                          checked={values.guild_id === server.id}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setValues((prev) => ({
                                ...prev,
                                guild_id: server.id,
                              }));
                            }
                          }}
                        />
                        <Label
                          htmlFor={`MAIN${server.id}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Image
                            src={server.icon}
                            alt="Server Icon"
                            width={60}
                            height={60}
                            className={clsx("rounded-full border-4", {
                              "border-accent": values.guild_id === server.id,
                            })}
                          />
                          {server.name}
                        </Label>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">TW Discord Server</h2>
              <div className="grid grid-cols-2 gap-2">
                {servers.length > 0
                  ? servers.map((server) => (
                      <div
                        key={`TW${server.id}`}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          className="hidden"
                          id={`TW${server.id}`}
                          checked={values.tw_discord === server.id}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setValues((prev) => ({
                                ...prev,
                                tw_discord: server.id,
                              }));
                            }
                          }}
                        />
                        <Label
                          htmlFor={`TW${server.id}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Image
                            src={server.icon}
                            alt={`TW${server.name}`}
                            width={60}
                            height={60}
                            className={clsx("rounded-full border-4", {
                              "border-accent": values.tw_discord === server.id,
                            })}
                          />
                          {server.name}
                        </Label>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
        <Button
          disabled={values.guild_id === "" || values.tw_discord === ""}
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
