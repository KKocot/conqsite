"use client";

import HouseSeasonTable from "@/feature/stats/house-season-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import SeasonSimpleInfo from "@/feature/stats/season-simple-info";

const Content = ({
  data,
  seasons,
  numberOfPlayer,
}: {
  data: UsersStats[];
  seasons: SeasonProps[];
  numberOfPlayer: number;
}) => {
  return (
    <div className="container">
      <h1 className="text-3xl p-12 font-bold text-center">
        {numberOfPlayer} Members
      </h1>
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
              {data
                .sort((a, b) => b.attendance.length - a.attendance.length)
                .map((user) => (
                  <HouseSeasonTable key={user.id} item={e} userStats={user} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
export default Content;
// TODO: Add translations
