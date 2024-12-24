"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import clsx from "clsx";

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
        <TabsContent key={e.season} value={e.season}>
          <Table className="w-fit">
            <TableHeader>
              <TableRow>
                <TableHead>Nick</TableHead>
                <TableHead>Attendance in %</TableHead>
              </TableRow>
            </TableHeader>
            {data.map((user) => (
              <SeasonTable item={e} userStats={user} />
            ))}
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Content;

const SeasonTable = ({
  item,
  userStats,
}: {
  item: SeasonProps;
  userStats: UsersStats;
}) => {
  const endDate =
    new Date(item.endDate) > new Date() ? new Date() : new Date(item.endDate);

  const listOfTW = createDateArray(
    item.startDate,
    endDate.toISOString().split("T")[0]
  ).filter((date) => !item.drillModes.includes(date));

  const cleandAttendanceDates = userStats.attendance.filter((date) => {
    return (
      new Date(date) >= new Date(item.startDate) &&
      new Date(date) <= new Date(item.endDate) &&
      !item.drillModes.includes(date)
    );
  });
  const attendancePercentage =
    listOfTW.length > 0
      ? ((cleandAttendanceDates.length / listOfTW.length) * 100).toFixed(2)
      : "0.00";

  return (
    <TableBody>
      <TableRow>
        <TableCell className="text-start">
          <div>{userStats.nick ?? userStats.id}</div>
        </TableCell>
        <TableCell
          className={clsx("text-start", {
            "text-red-500": Number(attendancePercentage) === 0,
            "text-green-500":
              Number(attendancePercentage) > 0 &&
              Number(attendancePercentage) <= 25,
            "text-blue-500": Number(attendancePercentage) > 25,
            "text-purple-500": Number(attendancePercentage) > 50,
            "text-yellow-500": Number(attendancePercentage) > 75,
          })}
        >
          {attendancePercentage}%
        </TableCell>
        {cleandAttendanceDates.map((e) => (
          <TableCell className="text-center p-1">{e}</TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};
