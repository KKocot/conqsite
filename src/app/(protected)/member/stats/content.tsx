"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import clsx from "clsx";
import { useState } from "react";

const Content = ({
  data,
  seasons,
}: {
  data: UsersStats;
  seasons: SeasonProps[];
}) => {
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
                  <TableHead className="text-center">Season Start</TableHead>
                  <TableHead className="text-center">Season End</TableHead>
                  <TableHead className="text-center">
                    List of Drillmodes
                  </TableHead>
                  <TableHead className="text-center">List of TW</TableHead>
                  <TableHead className="text-center">
                    Attendance Dates List
                  </TableHead>
                  <TableHead className="text-center">Attendance in %</TableHead>
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
        <TableCell className="text-center">
          <div className="flex self-end">{item.startDate}</div>
        </TableCell>
        <TableCell className="text-center">{item.endDate}</TableCell>
        <TableCell className="text-center">
          <div className="flex flex-col gap-2">
            {item.drillModes.map((date) => (
              <div key={date}>{date}</div>
            ))}
          </div>
        </TableCell>
        <TableCell className="text-center">
          {listOfTW.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {listOfTW.map((date) => (
                <div
                  className={clsx("w-24", {
                    "text-green-500": cleandAttendanceDates.includes(date),
                  })}
                  key={date}
                >
                  {date}
                </div>
              ))}
            </div>
          ) : (
            <div>TW no started yet</div>
          )}
        </TableCell>
        <TableCell className="text-center">
          {cleandAttendanceDates.length > 0
            ? cleandAttendanceDates.map((e) => <div key={e}>{e}</div>)
            : "No data"}
        </TableCell>
        <TableCell className="text-center">{attendancePercentage}%</TableCell>
      </TableRow>
    </TableBody>
  );
};
