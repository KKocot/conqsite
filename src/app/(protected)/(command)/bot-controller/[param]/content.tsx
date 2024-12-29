"use client";

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
  getCyclicalEvents,
  getDiscordData,
  getHouseAssets,
  HouseSettings,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";

const Content = ({
  house,
  userId,
  config,
}: {
  house: string;
  userId: string;
  config: HouseSettings;
}) => {
  const { data: assets, isLoading: assetsLoading } = useQuery({
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
        <AddEventDialog />
      </div>
    </div>
  );
};
export default Content;

const AddEventDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom">Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
