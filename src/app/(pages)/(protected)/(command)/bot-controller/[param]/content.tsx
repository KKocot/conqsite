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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EventDialog from "@/feature/bot-controller/dialog";
import {
  getDiscordData,
  getHouseAssets,
  HouseSettings,
  BotEvent,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { PenIcon, Trash2 } from "lucide-react";

const Content = ({
  house,
  userId,
  config,
  events,
}: {
  house: string;
  userId: string;
  config: HouseSettings;
  events: BotEvent[];
}) => {
  const { data: assets } = useQuery({
    queryKey: ["houseAssets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });
  const { data: discordData, isLoading: discordDataLoading } = useQuery({
    queryKey: ["discordData", house],
    queryFn: () =>
      getDiscordData(userId, {
        guild_id: config.id,
        tw_discord: config.tw.server,
        anotherDC: config.tw.server !== config.id,
      }),
    enabled: !!house,
  });
  const deleteBotEventMutation = useDeleteBotEventMutation();
  const onDelete = (event: BotEvent) => {
    deleteBotEventMutation.mutate({ id: event._id ?? "", house });
  };
  const premium = assets?.premium ?? false;
  const limited = (events.length ?? 0) >= (premium ? 6 : 7);
  return (
    <div className="container py-8 px-4">
      <div className="flex gap-4 flex-wrap">
        {events.length === 0 ? (
          <div>No events found</div>
        ) : (
          events.map((event, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>Description: {event.description}</div>
                <div>{`Event start: ${event.date_start_event} ${event.time_start_event}`}</div>
                <div>{`Next event: ${
                  event.interval === -1
                    ? "TW"
                    : event.interval === 0
                    ? "Never"
                    : `${event.interval} days`
                }`}</div>
                <div>{`Activity time: ${event.activity_time} hours`}</div>
                <div>{`Channel ID: ${
                  discordData?.channels.find((e) => e.id === event.channel_id)
                    ?.label
                }`}</div>
                <div>{`Role ID: ${
                  discordData?.roles.find((e) => e.id === event.role_id)?.label
                }`}</div>
                <div>{`List: ${event.signUps.length}`}</div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <span>Actions:</span>
                {discordDataLoading || !discordData ? null : (
                  <EventDialog
                    disabled={limited}
                    discordData={discordData}
                    house={house}
                    entry={event}
                    roleId={config.member.id}
                  />
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        className="rounded-full p-2 h-fit"
                        onClick={() => onDelete(event)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {discordDataLoading || !discordData ? null : (
        <div className="absolute bottom-4 right-4 gap-2 flex">
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
