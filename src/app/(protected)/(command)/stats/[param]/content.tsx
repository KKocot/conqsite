"use client";

import HouseSeasonTable from "@/components/house-season-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { useTranslations } from "next-intl";

const Content = ({
  data,
  seasons,
}: {
  data: UsersStats[];
  seasons: SeasonProps[];
}) => {
  const t = useTranslations("HouseStats");
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
        <TabsContent key={e.season} value={e.season}>
          <Table className="w-fit">
            <TableHeader>
              <TableRow>
                <TableHead>{t("username")}</TableHead>
                <TableHead>{t("attendance_in_percent")}</TableHead>
              </TableRow>
            </TableHeader>
            {data.map((user) => (
              <HouseSeasonTable key={user.id} item={e} userStats={user} />
            ))}
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;
