import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetTypes } from "@/lib/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { Info, Send } from "lucide-react";
import {
  DiscordDataByName,
  getPublicLineup,
  PublicLineup,
} from "@/lib/get-data";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useAddLineupMutation } from "@/components/hooks/use-lineups-mutation";
import useDeleteSheetMutation from "@/components/hooks/use-sheet-mutation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "usehooks-ts";
import { useSession } from "next-auth/react";
import HoverClickTooltip from "@/components/hover-click-tooltip";

export interface MessageData {
  url: string;
  channel_id: string;
  role_id: string;
  author: string;
  tread: boolean;
  change_nick: boolean;
}

export function PublicDialog({
  data,
  house,
  dates,
  commander,
  setSheetData,
  setCommander,
  premium,
  discordData,
}: {
  data: SheetTypes[];
  house: string;
  dates?: string[];
  commander?: string;
  setSheetData: Dispatch<SetStateAction<SheetTypes[]>>;
  setCommander: Dispatch<SetStateAction<string>>;
  premium?: boolean;
  discordData: DiscordDataByName;
}) {
  const { data: user } = useSession();
  const t = useTranslations("BuildTeam.public");

  const DEFAULT_MESSAGE_DATA: MessageData = {
    url: `https://conqsite.bard-dev.com/lineups/${house}`,
    channel_id: discordData.default_channel,
    role_id: discordData.default_role_id,
    author: user?.user.id ?? "",
    tread: false,
    change_nick: false,
  };

  const [publicationName, setPublicationName] = useState("");
  const [date, setDate] = useState<string>(dates ? dates[0] : "");
  const [publicLineup, setPublicLineup] = useState<PublicLineup[]>([]);
  const [storedMessageData, setStorageMessageData] =
    useLocalStorage<MessageData>(
      `discord-message-${house}`,
      DEFAULT_MESSAGE_DATA
    );

  const deleteSheetMutation = useDeleteSheetMutation();
  const updateLineup = useAddLineupMutation();
  const onDateChange = async (date: string) => {
    try {
      const response = await getPublicLineup(house, date);
      if (!response) {
        console.error("Error occurred:", response);
      } else {
        setPublicLineup(response);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    if (date || updateLineup.isSuccess || deleteSheetMutation.isSuccess) {
      onDateChange(date);
    }
  }, [
    date,
    updateLineup.isSuccess,
    updateLineup.isPending,
    deleteSheetMutation.isSuccess,
    deleteSheetMutation.isPending,
  ]);

  const existingLineup = publicLineup.find((e) => e.name === publicationName);
  const lineupsLimit = premium ? 6 : 3;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background">
          <Send className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              <h1>{t("public")}</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="custom">
                    {date ?? t("no_lineups")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50">
                  <div className="flex flex-col gap-2 bg-secondary p-6">
                    {dates
                      ? dates.map((e) => (
                          <Button
                            variant="custom"
                            key={e}
                            onClick={() => {
                              setDate(e);
                              toast.success(t("date_loaded"));
                            }}
                          >
                            {e}
                          </Button>
                        ))
                      : null}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2">
            <h1>
              {t("lineups_from")}
              {date}
            </h1>
            <div className="flex flex-col gap-2 w-64">
              {publicLineup.map((e) => (
                <div key={e.name} className="flex items-center justify-between">
                  <h2>{e.name}</h2>
                  <div className="flex items-center">
                    <Button
                      variant="custom"
                      size="xs"
                      onClick={() => {
                        setPublicationName(e.name);
                        setSheetData(e.sheet);
                        toast.success(t("lineup_loaded"));
                        setCommander(e.commander || "");
                      }}
                    >
                      {t("load")}
                    </Button>
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => {
                        const confirmed = confirm(t("are_you_sure"));
                        if (confirmed) {
                          deleteSheetMutation.mutate({
                            house,
                            date: e.date,
                            name: e.name,
                          });
                          toast.success(t("lineup_deleted"));
                        }
                      }}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <Label htmlFor="name" className="text-right">
              {t("lineup_name")}
            </Label>
            <div className="relative w-full">
              <Input
                id="name"
                placeholder={t("lineup_name")}
                value={publicationName}
                onChange={(e) => setPublicationName(e.target.value)}
                className="col-span-3"
              />

              <Button
                variant="custom"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                disabled={
                  publicationName === "" ||
                  (publicLineup.length >= lineupsLimit && !existingLineup)
                }
                onClick={() => {
                  updateLineup.mutate({
                    name: publicationName,
                    house: house,
                    date: date,
                    sheet: data,
                    commander: commander ?? "",
                    change_nick: storedMessageData.change_nick ?? false,
                  });
                  try {
                    fetch("/api/discord-bot/message-lineup", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ...storedMessageData,
                        date: date,
                        name: publicationName,
                        house: house,
                        url: `https://conqsite.bard-dev.com/lineups/${house.replaceAll(
                          " ",
                          "%20"
                        )}?name=${publicationName.replaceAll(
                          " ",
                          "+"
                        )}&date=${date}`,
                      }),
                    });
                  } catch (error) {
                    console.error("Error occurred:", error);
                  }
                  toast.success(
                    existingLineup ? t("lineup_updated") : t("lineup_added")
                  );
                }}
              >
                {existingLineup ? t("update") : t("add")}
              </Button>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="w-1/2">
              <Label>DC channel</Label>
              <Select
                value={storedMessageData.channel_id}
                onValueChange={(e) => {
                  setStorageMessageData((prev) => ({ ...prev, channel_id: e }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {discordData.channels.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <Label
                  htmlFor="tread"
                  className="text-sm text-muted-foreground flex justify-between p-1 items-center cursor-pointer"
                >
                  <div>Post in Tread</div>

                  {storedMessageData.tread ? "✅" : "❌"}
                </Label>
                <Checkbox
                  id="tread"
                  className="hidden"
                  checked={storedMessageData.tread}
                  onCheckedChange={(e) => {
                    setStorageMessageData((prev) => ({
                      ...prev,
                      tread: !prev.tread,
                    }));
                  }}
                />
              </div>
              <div>
                <Label
                  htmlFor="change-nick"
                  className="text-sm text-muted-foreground flex justify-between p-1 items-center cursor-pointer"
                >
                  <div>
                    Change nicknames
                    <HoverClickTooltip
                      triggerChildren={<Info className="w-4 h-4" />}
                      buttonStyle="rounded-full"
                    >
                      <div className="ml-2 w-56">
                        Change usernames to usernames with index numbers on TW
                        discord server
                      </div>
                    </HoverClickTooltip>
                  </div>
                  {storedMessageData.change_nick ? "✅" : "❌"}
                </Label>
                <Checkbox
                  id="change-nick"
                  className="hidden"
                  checked={storedMessageData.change_nick ?? false}
                  onCheckedChange={(e) =>
                    setStorageMessageData((prev) => ({
                      ...prev,
                      change_nick: !prev.change_nick,
                    }))
                  }
                />
              </div>
            </div>

            <div className="w-1/2">
              <Label>DC role</Label>
              <Select
                value={storedMessageData.role_id}
                onValueChange={(e) => {
                  setStorageMessageData((prev) => ({ ...prev, role_id: e }));
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {discordData.roles.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date ? new Date(date) : new Date()}
            onSelect={(d) =>
              d &&
              setDate(
                `${d?.getFullYear()}-${String(
                  Number(d?.getMonth()) + 1
                ).padStart(2, "0")}-${String(d?.getDate()).padStart(2, "0")}`
              )
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
// TODO translation
