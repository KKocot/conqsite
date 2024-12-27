"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-wrap gap-4 justify-center items-center w-full">
      {cyclicalEventsLoading ? (
        <div>Loading Cyclial Events </div>
      ) : !cyclicalEvents ? (
        <div>No cyclical events found</div>
      ) : (
        cyclicalEvents.map((event, i) => (
          <Card className="h-64" key={i}>
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
  );
};
export default Content;
