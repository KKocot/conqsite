import CreateHouseDiscordServers from "@/components/create-house-discord-servers";
import CreateHouseHighRoles from "@/components/create-house-high-roles";
import CreateHouseCard from "@/components/create-house-card";
import CreateHouseConfig, {
  ConfigProps,
} from "@/components/create-house-config";
import { DiscordProps, DiscordUsersProps } from "@/lib/get-data";
import { useState } from "react";
import { useSession } from "next-auth/react";

export interface GeneralDataProps {
  guild_id: string;
}
export interface CommandersProps {
  highcommand: { id: string; username: string }[];
  righthand: { id: string; username: string }[];
}
const Content = () => {
  const user = useSession();
  const [step, setStep] = useState(1);
  const [ganeralData, setGeneralData] = useState<GeneralDataProps>({
    guild_id: "",
  });
  const [discordData, setDiscordData] = useState<DiscordProps | null>(null);
  const [configValues, setConfigValues] = useState<ConfigProps>({
    member: "",
    logs: "",
    tw_member: "",
    lineup: [{ channelID: "", roleID: "" }],
  });
  const [discordUsers, setDiscordUsers] = useState<DiscordUsersProps | null>(
    null
  );
  const [selectedUsers, setSelectedUsers] = useState<CommandersProps>({
    highcommand: [],
    righthand: [],
  });
  return (
    <div className="container pt-8">
      {step === 1 ? (
        <CreateHouseDiscordServers
          creatorId={user.data?.user.id as string}
          handleStep={(e) => setStep(e)}
          handleDiscord={(e) => setDiscordData(e)}
          handlerGeneral={setGeneralData}
        />
      ) : step === 2 && discordData ? (
        <CreateHouseConfig
          data={discordData}
          handleStep={(e) => setStep(e)}
          values={configValues}
          setValues={setConfigValues}
          handleDiscordUsers={(e) => setDiscordUsers(e)}
          creatorId={user.data?.user.id as string}
          discordServer={ganeralData.guild_id}
        />
      ) : step === 3 && discordUsers ? (
        <CreateHouseHighRoles
          handleStep={(e) => setStep(e)}
          discordUsers={discordUsers}
          values={selectedUsers}
          setValues={setSelectedUsers}
        />
      ) : step === 4 ? (
        <CreateHouseCard />
      ) : null}
    </div>
  );
};

export default Content;
