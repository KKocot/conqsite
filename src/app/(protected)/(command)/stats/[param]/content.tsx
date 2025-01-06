"use client";

import HouseSeasonTable from "@/feature/stats/house-season-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import SeasonSimpleInfo from "@/feature/stats/season-simple-info";

const Content = ({
  data,
  seasons,
}: {
  data: UsersStats[];
  seasons: SeasonProps[];
}) => {
  return (
    <Tabs
      defaultValue={seasons[seasons.length - 1].season}
      className="caption-top w-full"
    >
      <TabsList className="flex gap-4 w-full">
        {seasons.map((e) => (
          <TabsTrigger key={e.season} value={e.season}>
            {e.season}
          </TabsTrigger>
        ))}
      </TabsList>
      {seasons.map((e) => (
        <TabsContent value={e.season} key={e.season}>
          <SeasonSimpleInfo item={e} />
          <div className="grid grid-cols-3 gap-4 p-4">
            {data.map((user) => (
              <HouseSeasonTable key={user.id} item={e} userStats={user} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
