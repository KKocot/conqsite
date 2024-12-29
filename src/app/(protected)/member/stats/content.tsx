"use client";

import SeasonTable from "@/components/season-table";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Content = ({
  data,
  seasons,
}: {
  data: UsersStats;
  seasons: SeasonProps[];
}) => {
  const t = useTranslations("MyStats");
  const [date, setDate] = useState<Date[]>(
    data.attendance.map((e) => new Date(e))
  );
  return (
    <div className="p-6 w-full flex justify-around">
      <div className="w-fit">
        <Calendar
          mode="multiple"
          selected={date}
          onSelect={() => setDate((prev) => [...prev])}
          className="rounded-md border shadow"
        />
      </div>
      <Tabs
        defaultValue={seasons[seasons.length - 1].season}
        className="caption-top"
      >
        <TabsList className="flex gap-4">
          {seasons.map((e) => (
            <TabsTrigger key={e.season} value={e.season}>
              {e.season}
            </TabsTrigger>
          ))}
        </TabsList>
        {seasons.map((e) => (
          <TabsContent key={e.season} value={e.season}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    {t("season_start")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("season_end")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("list_of_drillmodes")}
                  </TableHead>
                  <TableHead className="text-center">
                    {t("list_of_tw")}
                  </TableHead>

                  <TableHead className="text-center">
                    {t("attendance_in_percent")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <SeasonTable item={e} userStats={data} />
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
export default Content;
