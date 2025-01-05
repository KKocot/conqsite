"use client";

import { DiscordDataProps } from "@/app/(protected)/member/create-house/content";
import CreateHouseConfig from "@/feature/create-house/create-house-config";
import CreateHouseDiscordServers from "@/feature/create-house/create-house-discord-servers";
import { HouseSettings } from "@/lib/get-data";
import { useState } from "react";
import { toast } from "react-toastify";

export interface EditConfigProps {
  guild_id: string;
  tw_discord: string;
  member: string;
  logs: string;
  tw_member: string;
  lineup: { channelID: string; roleID: string; name: string }[];
  name: string;
}
const Content = ({
  data,
  creatorId,
}: {
  data: HouseSettings;
  creatorId: string;
}) => {
  const [step, setStep] = useState(1);
  const [discordData, setDiscordData] = useState<DiscordDataProps>({
    lists: null,
    users: null,
  });
  const [values, setValues] = useState<EditConfigProps>({
    guild_id: data.id,
    tw_discord: data.tw.server,
    member: data.member.id,
    logs: data.logs.attendance,
    tw_member: data.tw.member,
    lineup: data.lineup.map((item) => ({
      channelID: item.id,
      roleID: item.roleId,
      name: item.name,
    })),
    name: data.name,
  });
  const onUpdate = async () => {
    try {
      const response = await fetch(`/api/houseSettings?name=${values.name}`, {
        method: "POST",
        body: JSON.stringify({
          id: values.guild_id,
          name: values.name,
          member: {
            name: values.member,
            id: values.member,
          },
          lineup: values.lineup.map((item) => ({
            name: item.name,
            id: item.channelID,
            roleId: item.roleID,
          })),
          logs: {
            logs: values.logs,
            attendance: values.logs,
          },
          tw: {
            server: values.tw_discord,
            member: values.tw_member,
          },
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("error_occurred", errorData);
      } else {
        toast.success("house_settings_saved");
        console.log("success", await response.json());
      }
    } catch (error) {
      toast.error("error_occurred");
      console.error("error_occurred", error);
    }
  };
  return (
    <div className="flex flex-col gap-6 container">
      {step === 1 ? (
        <CreateHouseDiscordServers
          type="edit"
          creatorId={creatorId}
          handleStep={(e) => setStep(e)}
          handleDiscord={setDiscordData}
          handlerGeneral={setValues}
          configValues={values}
        />
      ) : step === 2 && discordData.lists ? (
        <CreateHouseConfig
          type="edit"
          data={discordData.lists}
          handleStep={(e) => setStep(e)}
          values={values}
          setValues={setValues}
          handleDiscordUsers={setDiscordData}
          creatorId={creatorId}
          discordServer={values.guild_id}
          onUpdate={onUpdate}
        />
      ) : null}
      <div />
    </div>
  );
};
export default Content;
