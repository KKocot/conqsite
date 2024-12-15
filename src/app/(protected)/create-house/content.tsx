import CreateHouseDiscordServers from "@/components/create-house-discord-servers";
import CreateHouseHighRoles from "@/components/create-house-high-roles";
import CreateHouseCard from "@/components/create-house-card";
import CreateHouseConfig, {
  ConfigProps,
} from "@/components/create-house-config";
import { DiscordProps } from "@/lib/get-data";
import { useState } from "react";

const Content = () => {
  const [step, setStep] = useState(1);
  const [discordData, setDiscordData] = useState<DiscordProps | null>(null);
  const [configValues, setConfigValues] = useState<ConfigProps>({
    member: "",
    logs: "",
    tw_member: "",
    lineup: [{ channelID: "", roleID: "" }],
  });
  return (
    <div className="container pt-8">
      {step === 1 ? (
        <CreateHouseDiscordServers
          handleStep={(e) => setStep(e)}
          handleDiscord={(e) => setDiscordData(e)}
        />
      ) : step === 2 && discordData ? (
        <CreateHouseConfig
          data={discordData}
          handleStep={(e) => setStep(e)}
          values={configValues}
          setValues={setConfigValues}
        />
      ) : step === 3 ? (
        <CreateHouseHighRoles handleStep={(e) => setStep(e)} />
      ) : step === 4 ? (
        <CreateHouseCard />
      ) : null}
    </div>
  );
};

export default Content;
