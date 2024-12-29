"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import clsx from "clsx";

const HouseSeasonTable = ({
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
          <TableCell key={e} className="text-center p-1">
            {e}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};
export default HouseSeasonTable;
