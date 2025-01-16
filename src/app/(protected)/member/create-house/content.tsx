import CreateHouseDiscordServers from "@/feature/create-house/create-house-discord-servers";
import CreateHouseHighRoles from "@/feature/create-house/create-house-high-roles";
import CreateHouseCard from "@/feature/create-house/create-house-card";
import CreateHouseConfig from "@/feature/create-house/create-house-config";
import { DiscordProps, DiscordUsersProps, getAddAll } from "@/lib/get-data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import clsx from "clsx";
import Steper from "@/components/steper";

export interface ConfigProps {
  guild_id: string;
  tw_discord: string;
  member: string;
  logs: string;
  tw_member: string;
  lineup: { channelID: string; roleID: string; name: string }[];
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
  highcommand: { id: string; username: string }[];
  righthand: { id: string; username: string }[];
}

export interface DiscordDataProps {
  lists: DiscordProps | null;
  users: DiscordUsersProps | null;
}

const Content = ({ username }: { username: string }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [discordData, setDiscordData] = useState<DiscordDataProps>({
    lists: null,
    users: null,
  });
  const [configValues, setConfigValues] = useState<ConfigProps>({
    guild_id: "",
    tw_discord: "",
    member: "",
    logs: "",
    tw_member: "",
    lineup: [{ channelID: "", roleID: "", name: "" }],
    name: "",
    description: "",
    country: "",
    discordLink: "",
    avatar: "https://i.imgur.com/4VEMy1m.png",
    server: "",
    highcommand: [],
    righthand: [],
  });
  const onSubmit = async () => {
    try {
      const response = await fetch(
        `/api/createHouse?house=${configValues.name}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...configValues,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("error_occurred", errorData);
      } else {
        console.log("success", await response.json());
        getAddAll(configValues.name);
      }
    } catch (error) {
      console.error("error_adding", error);
    } finally {
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col items-center w-full pt-6">
      <Steper
        step={step}
        tooltips={[
          "Discord Servers",
          "Bot Configuration",
          "High Roles",
          "Card",
        ]}
      />
      <div className="container pt-8">
        {step === 1 ? (
          <CreateHouseDiscordServers
            type="create"
            creatorId={username}
            handleStep={(e) => setStep(e)}
            handleDiscord={setDiscordData}
            handlerGeneral={setConfigValues}
          />
        ) : step === 2 && discordData.lists ? (
          <CreateHouseConfig
            type="create"
            data={discordData.lists}
            handleStep={(e) => setStep(e)}
            values={configValues}
            setValues={setConfigValues}
            handleDiscordUsers={setDiscordData}
            creatorId={username}
            discordServer={configValues.guild_id}
          />
        ) : step === 3 && discordData.users ? (
          <CreateHouseHighRoles
            type="create"
            handleStep={(e) => setStep(e)}
            discordUsers={discordData.users}
            values={configValues}
            setValues={setConfigValues}
          />
        ) : step === 4 ? (
          <CreateHouseCard
            type="create"
            onSubmit={onSubmit}
            values={configValues}
            setValues={setConfigValues}
            handleStep={setStep}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Content;
