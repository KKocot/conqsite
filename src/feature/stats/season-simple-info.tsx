import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SeasonProps, UsersStats } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";

const transformDataToPlot = (season: SeasonProps, data: UsersStats[]) => {
  const endDate =
    new Date(season.endDate) > new Date()
      ? new Date()
      : new Date(season.endDate);
  const listOfTW = createDateArray(
    season.startDate,
    endDate.toISOString().split("T")[0]
  ).filter((date) => !season.drillModes.includes(date));

  const TWMap = new Map();
  for (let tw of listOfTW) {
    TWMap.set(tw, 0);
  }
  for (let user of data) {
    for (let attendance of user.attendance) {
      if (TWMap.has(attendance)) {
        TWMap.set(attendance, TWMap.get(attendance) + 1);
      }
    }
  }

  const sortedData = Array.from(TWMap).map(([date, numberOfPlayers]) => {
    return { date, numberOfPlayers };
  });
  return { sortedData, listOfTW };
};

export type PayloadOrder = {
  date: string;
  numberOfPlayers: string;
};
interface Payload {
  value: number;
  color: string;
  dataKey: string;
  fill: string;
  fillOpacity: number;
  name: string;
  payload: PayloadOrder;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Payload[];
}) => {
  if (active && payload && payload.length) {
    console.log(payload);
    return (
      <div className="bg-background p-2 text-sm">
        <p>{`Date: ${payload[0].payload.date}`}</p>
        <p>{`Number on TW: ${payload[0].payload.numberOfPlayers}`}</p>
      </div>
    );
  }
};

const SeasonSimpleInfo = ({
  item,
  data,
}: {
  item: SeasonProps;
  data: UsersStats[];
}) => {
  const t = useTranslations("HouseStats");

  const { sortedData, listOfTW } = useMemo(
    () => transformDataToPlot(item, data),
    [item, data]
  );
  return (
    <>
      <Table className="border-b-[1px] border-gray-600">
        <TableHeader>
          <TableRow>
            <TableHead>{t("season_start")}</TableHead>
            <TableHead>{t("season_end")}</TableHead>
            <TableHead>{t("drillmodes")}</TableHead>
            <TableHead>{t("tw")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>{item.drillModes.length}</Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background p-4 z-50">
                    {item.drillModes.map((date) => (
                      <div key={date}>{date}</div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>{listOfTW.length}</Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-background p-4 z-50">
                    {listOfTW.map((date) => (
                      <div key={date}>{date}</div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart
          width={500}
          height={400}
          data={sortedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" className="text-xs" angle={25} />
          <YAxis className="text-xs" />
          <RechartsTooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="numberOfPlayers" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
export default SeasonSimpleInfo;
