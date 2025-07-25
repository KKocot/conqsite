"use client";

import { useDeleteBotEventMutation } from "@/components/hooks/use-bot-event-mutation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssetsDialog from "@/feature/bot-controller/messages-dialog";
import EventDialog from "@/feature/bot-controller/dialog";
import {
  getDiscordData,
  HouseSettings,
  BotEvent,
  HouseAssets,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { Info, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
interface Props {
  house: string;
  userId: string;
  config: HouseSettings;
  events: BotEvent[];
  assets?: HouseAssets;
  botContent: string;
}

const Content = ({
  house,
  userId,
  config,
  events,
  botContent,
  assets = { name: house, premium: false, sharedList: false, signupBot: "" },
}: Props) => {
  const t = useTranslations("CommandPages.BotController");

  // Data for discord server: channels, roles, users
  const { data: discordData, isLoading: discordDataLoading } = useQuery({
    queryKey: ["discordData", house],
    queryFn: () =>
      getDiscordData(userId, {
        guild_id: config.id,
        tw_discord: config.id,
      }),
    enabled: !!house,
  });
  const deleteBotEventMutation = useDeleteBotEventMutation();

  // Delete event
  const onDelete = (event: BotEvent) => {
    // event._id is undefined when creating new event
    if (event._id) deleteBotEventMutation.mutate({ id: event._id, house });
  };

  // Check if if limited events is reached
  const limited = (events.length ?? 0) >= (assets?.premium ? 6 : 3);

  // Check if response from discord server is an error
  if (discordData?.status === "error") {
    return (
      <div className="container text-center py-8 px-4">{discordData.error}</div>
    );
  }
  return (
    <div className="container py-8 px-4">
      {/* Check if events list is empty */}
      {events.length === 0 ? (
        <div className="text-center">{t("no_events_found")}</div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {events.map((event, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {t("description", {
                    description: event.description,
                  })}
                </div>
                <div>
                  {t("event_start", {
                    date: event.date_start_event,
                    time: event.time_start_event,
                  })}
                </div>
                <div>
                  {t("next_event", {
                    interval:
                      event.interval === -1
                        ? t("tw")
                        : event.interval === 0
                        ? t("never")
                        : t("days", {
                            days: event.interval,
                          }),
                  })}
                </div>
                <div>
                  {t("activity_time", {
                    time: event.activity_time,
                  })}
                </div>
                <div>
                  {t("channel_id", {
                    label:
                      discordData?.channels.find(
                        (e) => e.id === event.channel_id
                      )?.label ?? t("unknown_channel"),
                  })}
                </div>
                <div>
                  {t("role_id", {
                    label:
                      discordData?.roles.find((e) => e.id === event.role_id)
                        ?.label ?? t("unknown_role"),
                  })}
                </div>
                <div>
                  {t("list", {
                    count: event.signUps.length,
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <span>{t("actions")}</span>
                {discordDataLoading || !discordData ? null : (
                  <EventDialog
                    disabled={limited}
                    discordData={discordData}
                    house={house}
                    entry={event}
                    roleId={config.member.id}
                  />
                )}
                <Button
                  variant="destructive"
                  className="rounded-full p-2 h-fit"
                  onClick={() => onDelete(event)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {discordDataLoading || !discordData ? null : (
        <div className="absolute bottom-4 right-4 gap-2 flex">
          <TooltipProvider>
            <Tooltip>
              <Dialog>
                <DialogTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="custom" className="rounded-full p-2 h-fit">
                      <Info size={24} />
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>
                <DialogContent className=" overflow-y-scroll max-h-full h-fit">
                  <div className="prose max-w-none container py-12">
                    <div dangerouslySetInnerHTML={{ __html: botContent }} />
                  </div>
                </DialogContent>
              </Dialog>
              <TooltipContent>{t("info")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AssetsDialog assets={assets} house={house} />
          <EventDialog
            disabled={limited}
            discordData={discordData}
            house={house}
            roleId={config.member.id}
          />
        </div>
      )}
    </div>
  );
};
export default Content;
