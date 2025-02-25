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
import EventDialog from "@/feature/bot-controller/dialog";
import {
  getDiscordData,
  getHouseAssets,
  HouseSettings,
  BotEvent,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
interface Props {
  house: string;
  userId: string;
  config: HouseSettings;
  events: BotEvent[];
}
const Content = ({ house, userId, config, events }: Props) => {
  // Get house assets
  const { data: assets } = useQuery({
    queryKey: ["houseAssets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });
  // Data for discord server: channels, roles, users
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

  // Delete event
  const onDelete = (event: BotEvent) => {
    // event._id is undefined when creating new event
    if (event._id) deleteBotEventMutation.mutate({ id: event._id, house });
  };

  // Check if house is premium
  const premium = assets?.premium ?? false;

  // Check if if limited events is reached
  const limited = (events.length ?? 0) >= (premium ? 3 : 6);

  // Check if events list is empty
  if (events.length === 0) return <div>No events found</div>;

  return (
    <div className="container py-8 px-4">
      <div className="flex gap-4 flex-wrap">
        {events.map((event, i) => (
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
