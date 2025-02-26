"use client";

import SeasonStats from "@/feature/stats/season-stats";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Content = ({
  data,
  seasons,
}: {
  data?: UsersStats;
  seasons: SeasonProps[];
}) => {
  const t = useTranslations("MyStats");
  const [date, setDate] = useState<Date[]>(
    data?.attendance?.map((e) => new Date(e)) ?? []
  );
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
      <Tabs defaultValue={seasons[seasons.length - 1].season}>
        <TabsList className="flex gap-4 mb-6">
          {seasons.map((e) => (
            <TabsTrigger key={e.season} value={e.season}>
              {e.season}
            </TabsTrigger>
          ))}
        </TabsList>
        {seasons.map((e) => (
          <TabsContent key={e.season} value={e.season}>
            <SeasonStats item={e} userStats={data} />
          </TabsContent>
        ))}
      </Tabs>
      <div className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={date}
          onSelect={() => setDate((prev) => [...prev])}
          className="rounded-md border shadow bg-card"
        />
      </div>
    </div>
  );
};
export default Content;
