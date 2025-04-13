import { useUpdateAssetsMutation } from "@/components/hooks/use-assets-mutation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HouseAssets } from "@/lib/get-data";
import { Settings } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  assets: HouseAssets;
  house: string;
}

const AssetsDialog = ({ assets, house }: Props) => {
  // Update assets mutation hook
  const updateHouseAssets = useUpdateAssetsMutation();

  // Update assets on switch change
  const onSwitchChange = () => {
    updateHouseAssets.mutate({
      // house name
      name: assets?.name ?? house,
      // premium is false by default
      premium: assets?.premium ?? false,
      // sharedList is false by default
      sharedList: assets?.sharedList ?? false,
      // signupBot is konquerus by default
      signupBot: assets?.signupBot ?? "konquerus",
      // messages is the opposite of the current value or true by default
      messages: !!assets ? !assets.messages : false,
    });
  };
  const onSurveysPing = async () => {
    const url = `/api/discord-bot/ping-no-surveys?guild_id=${house}`;
    let data;
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Authorization: `${process.env.BOT_KEY}`,
          "Content-Type": "application/json",
        },
      });
      data = await response.json();
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
    } finally {
      if (data.status === "ok") {
        toast(
          `Emtpy surveys: ${data.empty_survey}, but ${data.failed_members.length} failed`
        );
      }
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="custom" className="rounded-full p-2 h-fit">
                <Settings size={24} />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Bot messages</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <h2 className="font-bold">Permisions</h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id="messages"
                  disabled={updateHouseAssets.status === "pending"}
                  checked={assets?.messages ?? true}
                  onCheckedChange={onSwitchChange}
                />
                <Label htmlFor="messages">
                  Bot is allowed to message to players
                </Label>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-bold">Pings</h2>
              <div className="flex flex-col space-y-2">
                <Button variant="tab" onClick={onSurveysPing}>
                  Empty surveys
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <TooltipContent>Bot messages</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AssetsDialog;
