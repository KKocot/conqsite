"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const SeasonTable = ({
  item,
  userStats,
}: {
  item: SeasonProps;
  userStats: UsersStats;
}) => {
  const t = useTranslations("MyStats");
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
            <div className="flex-grow flex flex-wrap gap-2">
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
            <div>{t("tw_not_started")}</div>
          )}
        </TableCell>
        <TableCell className="text-center">{attendancePercentage}%</TableCell>
      </TableRow>
    </TableBody>
  );
};
export default SeasonTable;
