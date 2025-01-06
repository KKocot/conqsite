import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SeasonProps } from "@/lib/get-data";
import { createDateArray } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useTranslations } from "next-intl";

const SeasonSimpleInfo = ({ item }: { item: SeasonProps }) => {
  const t = useTranslations("HouseStats");
  const endDate =
    new Date(item.endDate) > new Date() ? new Date() : new Date(item.endDate);

  const listOfTW = createDateArray(
    item.startDate,
    endDate.toISOString().split("T")[0]
  ).filter((date) => !item.drillModes.includes(date));

  return (
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
                <TooltipContent className="bg-background p-4">
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
                <TooltipContent className="bg-background p-4">
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
  );
};
export default SeasonSimpleInfo;
