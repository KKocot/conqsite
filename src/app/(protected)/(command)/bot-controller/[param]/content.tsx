"use client";

import {
  BotEvent,
  useCreateEventMutation,
} from "@/components/hooks/use-create-event-mutation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DiscordProps,
  getCyclicalEvents,
  getDiscordData,
  getHouseAssets,
  HouseSettings,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Content = ({
  house,
  userId,
  config,
}: {
  house: string;
  userId: string;
  config: HouseSettings;
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
  const { data: cyclicalEvents, isLoading: cyclicalEventsLoading } = useQuery({
    queryKey: ["cyclicalEvents", house],
    queryFn: () => getCyclicalEvents(house),
    enabled: !!house,
  });
  const createEvent = useCreateEventMutation();
  const [values, setValues] = useState<BotEvent>({
    title: "",
    description: "",
    date: "",
    time: "",
    interval: 0,
    activity_time: 0,
    channel_id: "",
    role_id: "",
    guild_id: "",
    house_name: "",
  });
  const premium = assets?.premium ?? false;
  const limited = (cyclicalEvents?.length ?? 0) >= (premium ? 6 : 7);
  return (
    <div className="container py-8 px-4">
      <div className="flex gap-4 flex-wrap">
        {cyclicalEventsLoading ? (
          <div>Loading Cyclial Events </div>
        ) : !cyclicalEvents ? (
          <div>No cyclical events found</div>
        ) : (
          cyclicalEvents.map((event, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>Description: {event.description}</div>
                <div>{`Next event start: ${event.date} ${event.time}`}</div>
                {/* <Button variant="custom">Edit</Button> */}
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {discordDataLoading || !discordData ? null : (
        <div className="absolute bottom-4 right-4 gap-2 flex">
          <AddEventDialog disabled={limited} discordData={discordData} />
          <Button variant="custom">Create Event</Button>
        </div>
      )}
    </div>
  );
};
export default Content;

const AddEventDialog = ({
  disabled,
  discordData,
}: {
  disabled: boolean;
  discordData: DiscordProps;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom" disabled={disabled}>
          Create Cyclical Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Attendance Event</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
          <div>
            <Label htmlFor="interval">Interval</Label>
            <Input id="interval" type="text" />
          </div>
          <div>
            <Label htmlFor="activity_time">Activity Time</Label>
            <Input id="activity_time" type="number" />
          </div>
          <div>
            <Label htmlFor="channel_id">Channel ID</Label>
            <Select required>
              <SelectTrigger id="channel_id">
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discordData.channels.map((e) => (
                    <SelectItem value={e.id}>{e.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="role_id">Role ID</Label>
            <Select required>
              <SelectTrigger id="role_id">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discordData.roles.map((e) => (
                    <SelectItem value={e.id}>{e.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
