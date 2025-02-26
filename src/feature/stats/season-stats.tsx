"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import { useTranslations } from "next-intl";
import clsx from "clsx";

const SeasonStats = ({
  item,
  userStats,
}: {
  item: SeasonProps;
  userStats?: UsersStats;
}) => {
  const t = useTranslations("MyStats");
  const endDate =
    new Date(item.endDate) > new Date() ? new Date() : new Date(item.endDate);

  const listOfTW = createDateArray(
    item.startDate,
    endDate.toISOString().split("T")[0]
  ).filter((date) => !item.drillModes.includes(date));

  const cleandAttendanceDates =
    userStats?.attendance?.filter((date) => {
      return (
        new Date(date) >= new Date(item.startDate) &&
        new Date(date) <= new Date(item.endDate) &&
        !item.drillModes.includes(date)
      );
    }) ?? [];

  const attendancePercentage =
    listOfTW.length > 0
      ? ((cleandAttendanceDates.length / listOfTW.length) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Season Period</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {t("season_start")}: {item.startDate}
            </p>
            <p className="text-sm">
              {t("season_end")}: {item.endDate}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("attendance_in_percent")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{attendancePercentage}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("list_of_drillmodes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full gap-2">
              {item.drillModes.map((date) => (
                <span
                  key={date}
                  className="bg-secondary px-2 py-1 rounded text-center text-sm"
                >
                  {date}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("list_of_tw")}</CardTitle>
        </CardHeader>
        <CardContent>
          {listOfTW.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {listOfTW.map((date) => (
                <div
                  key={date}
                  className={clsx(
                    "px-3 py-2 rounded text-center text-sm",
                    cleandAttendanceDates.includes(date)
                      ? "bg-green-500/20 text-green-500"
                      : "bg-secondary"
                  )}
                >
                  {date}
                </div>
              ))}
            </div>
          ) : (
            <p>{t("tw_not_started")}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonStats;
