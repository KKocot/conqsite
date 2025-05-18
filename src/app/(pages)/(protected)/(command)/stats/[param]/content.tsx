"use client";

import HouseSeasonTable from "@/feature/stats/house-season-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilledSurveys, SeasonProps, UsersStatsSorted } from "@/lib/get-data";
import SeasonSimpleInfo from "@/feature/stats/season-simple-info";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Content = ({
  data,
  seasons,
  numberOfPlayer,
  filledList,
}: {
  data: UsersStatsSorted[];
  seasons: SeasonProps[];
  numberOfPlayer: number;
  filledList: FilledSurveys;
}) => {
  const chartFilledData = [
    { name: "Filled", value: filledList.filled_surveys },
    { name: "Empty", value: filledList.not_filled_surveys },
  ];
  return (
    <div className="container">
      <h1 className="text-3xl p-6 font-bold text-center">
        {numberOfPlayer} Members
      </h1>
      <div>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={chartFilledData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartFilledData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 p-6">
          <span className="text-green-500">
            Filled Surveys: {filledList.filled_surveys}
          </span>
          <span className="text-red-500">
            Empty Surveys: {filledList.not_filled_surveys}
          </span>
        </div>
      </div>

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
          <TabsContent value={e.season} key={e.season}>
            <SeasonSimpleInfo
              item={e}
              data={data.map((e) => ({
                ...e,
                attendance: e.attendance.flatMap((season) => season.dates),
              }))}
            />
            <div className="grid grid-cols-3 gap-4 p-4">
              {[...data]
                .sort((a, b) => {
                  const aAttendance =
                    a.attendance.find((att) => att.season === e.season)?.dates
                      .length ?? 0;
                  const bAttendance =
                    b.attendance.find((att) => att.season === e.season)?.dates
                      .length ?? 0;
                  return bAttendance - aAttendance;
                })
                .map((user, i) => (
                  <HouseSeasonTable
                    index={i + 1}
                    otherActivities={user.otherActivities}
                    key={user.id}
                    item={e}
                    username={user.nick}
                    attendance={
                      user.attendance.find((att) => att.season === e.season)
                        ?.dates ?? []
                    }
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
export default Content;
// TODO: Add translations
