"use client";

import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      ? ((cleandAttendanceDates.length / listOfTW.length) * 100).toFixed(0)
      : "0.00";

  return (
    <div className="flex items-center gap-2 max-w-64">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge
              className={clsx("text-black font-bold", {
                "bg-red-500": Number(attendancePercentage) === 0,
                "bg-green-500":
                  Number(attendancePercentage) > 0 &&
                  Number(attendancePercentage) <= 25,
                "bg-blue-500": Number(attendancePercentage) > 25,
                "bg-purple-500": Number(attendancePercentage) > 50,
                "bg-yellow-500": Number(attendancePercentage) > 75,
              })}
            >
              {attendancePercentage}%
            </Badge>
          </TooltipTrigger>
          {cleandAttendanceDates.length !== 0 ? (
            <TooltipContent className="flex flex-col">
              {cleandAttendanceDates.map((e) => (
                <span key={e} className="text-center p-1">
                  {e}
                </span>
              ))}
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
      <span className="text-start">
        <div>{userStats.nick ?? userStats.id}</div>
      </span>
    </div>
  );
};
export default HouseSeasonTable;
