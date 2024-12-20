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
} from "@/app/(protected)/create-house/content";

export interface CreateHouse {
  guild_id: string;
  tw_discord: string;
  anotherDC: boolean;
}

const CreateHouseDiscordServers = ({
  creatorId,
  handleDiscord,
  handleStep,
  handlerGeneral,
}: {
  creatorId: string;
  handleDiscord: Dispatch<SetStateAction<DiscordDataProps>>;
  handleStep: Dispatch<SetStateAction<number>>;
  handlerGeneral: Dispatch<SetStateAction<ConfigProps>>;
}) => {
  const [values, setValues] = useState<CreateHouse>({
    guild_id: "",
    tw_discord: "",
    anotherDC: false,
  });
  const onSubmit = async () => {
    const data: DiscordProps = await getDiscordData(creatorId, values);
    handleDiscord((prev) => ({ ...prev, lists: data }));
    if (data.status === "ok") {
      handleStep(2);
      handlerGeneral((prev) => ({ ...prev, guild_id: values.guild_id }));
    }
    if (data.status === "error") {
      alert(data.error);
    }
  };
  return (
    <Card>
      <CardHeader className="text-center text-2xl font-bold">
        Discord Verification
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Separator />
        <div className="flex p-12 justify-around gap-4">
          <div>
            <div>Give us your house Discord ID</div>
            <div className="flex gap-2">
              How to find Discord ID
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background">
                    <div className="flex">
                      <div className="flex flex-col items-center">
                        <p>Go to your Discord User Settings</p>
                        <Image
                          src="https://i.imgur.com/yT4pD80.png"
                          alt="user settings"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p>Go to Advanced and turn Developer mode on</p>
                        <Image
                          src="https://i.imgur.com/vF0rX4b.png"
                          alt="advanced"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p>
                          Right-click on the server and click Copy Server ID
                        </p>
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
              - Make sure{" "}
              <Link
                className="gap-1 text-red-600"
                href="https://discord.com/oauth2/authorize?client_id=1002261855718342759&permissions=8&integration_type=0&scope=bot"
                target="_blank"
              >
                <Link2 className="inline-block" /> Konquerus
              </Link>{" "}
              is on your Discord and got high role to see all roles and channels
            </div>
            <div>- Make sure you have admin role on that Discord</div>
            <br />
            <div>
              - Also Konquerus can track your house attendance by scaning all
              discord and record 3 time(at start, after 30min and at the end)
              and save it for you. If your house using different discord for TW,
              click checkbox, make sure you are an admin on that server and{" "}
              <Link
                className="gap-1 text-red-600 inline-block "
                href="https://discord.com/oauth2/authorize?client_id=1002261855718342759&permissions=8&integration_type=0&scope=bot"
                target="_blank"
              >
                <Link2 className="inline-block" /> Konquerus
              </Link>{" "}
              is on that server too.
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <Label htmlFor="discordId">Discord ID</Label>
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
                <Label htmlFor="twdiscordId">TW Discord ID</Label>
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
              <Label htmlFor="anotherDC">TW Discord ID</Label>
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
          Next
        </Button>
      </CardContent>
    </Card>
  );
};
export default CreateHouseDiscordServers;
