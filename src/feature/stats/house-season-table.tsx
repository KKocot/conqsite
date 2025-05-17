"use client";

import { SeasonProps, UsersStats, UsersStatsSorted } from "@/lib/get-data";
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
  index,
  item,
  attendance,
  username,
  otherActivities,
}: {
  index: number;
  item: SeasonProps;
  attendance: string[];
  username: string;
  otherActivities: UsersStats["otherActivities"];
}) => {
  const endDate =
    new Date(item.endDate) > new Date() ? new Date() : new Date(item.endDate);

  const listOfTW = createDateArray(
    item.startDate,
    endDate.toISOString().split("T")[0]
  ).filter((date) => !item.drillModes.includes(date));

  const cleandAttendanceDates = attendance.filter((date) => {
    return (
      new Date(date) >= new Date(item.startDate) &&
      new Date(date) <= new Date(item.endDate) &&
      !item.drillModes.includes(date)
    );
  });
  const cleanedOtherActivities =
    otherActivities?.filter((date) => {
      return (
        new Date(date.date) >= new Date(item.startDate) &&
        new Date(date.date) <= new Date(item.endDate)
      );
    }) || [];
  const attendancePercentage =
    listOfTW.length > 0
      ? ((cleandAttendanceDates.length / listOfTW.length) * 100).toFixed(0)
      : "0.00";
  const otherActivitiesLenght = cleanedOtherActivities.length;
  return (
    <div className="flex items-center gap-2 max-w-64">
      {index}
      <span className="flex flex-col items-center">
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
                {`TW ${attendancePercentage}%`}
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className={clsx("text-black font-bold", {
                  "bg-red-500": otherActivitiesLenght === 0,
                  "bg-green-500":
                    otherActivitiesLenght > 0 && otherActivitiesLenght <= 3,
                  "bg-blue-500": otherActivitiesLenght > 6,
                  "bg-purple-500": otherActivitiesLenght > 9,
                  "bg-yellow-500": otherActivitiesLenght > 12,
                })}
              >
                Other
              </Badge>
            </TooltipTrigger>
            {cleanedOtherActivities.length !== 0 ? (
              <TooltipContent className="flex flex-col">
                {cleanedOtherActivities.map((e, i) => (
                  <span key={i} className="text-center p-1">
                    {`${e.date} - ${e.type}`}
                  </span>
                ))}
              </TooltipContent>
            ) : null}
          </Tooltip>
        </TooltipProvider>
      </span>
      <span className="text-start">
        <div>{username}</div>
      </span>
    </div>
  );
};
export default HouseSeasonTable;
