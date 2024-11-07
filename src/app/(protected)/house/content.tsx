import {
  getHouseDetails,
  getPublicLineup,
  getPublicLineupDates,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { FC, useMemo, useState } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { getCloserDay, getUniqueValues } from "@/lib/utils";
import PreviewContainer from "@/components/preview-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Loading from "react-loading";
import { useSession } from "next-auth/react";

interface ContentProps {
  house: string;
  canDelete: boolean;
}
const Content: FC<ContentProps> = ({ house, canDelete }) => {
  const today = new Date();
  const { data: user } = useSession();

  const { data: datesData, isLoading: datesIsLoading } = useQuery({
    queryKey: ["lineup dates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });
  const { data: houseData, isLoading: houseIsLoading } = useQuery({
    queryKey: ["house", house],
    queryFn: () => getHouseDetails(house),
    enabled: !!house,
  });
  const [date, setDate] = useState<string>(
    `${today?.getDate()}-${today?.getMonth()}-${today?.getFullYear()}`
  );
  const { data: lineupData, isLoading: lineupIsLoading } = useQuery({
    queryKey: ["lineup", house, date],
    queryFn: () => getPublicLineup(house, date),
    enabled: !!house,
  });
  const values = useMemo(() => getUniqueValues(datesData ?? []), [datesData]);
  const [lineup, setLineup] = useState<string>("");

  const units = [
    ...goldenUnits,
    ...heroicUnits,
    ...blueUnits,
    ...greenUnits,
    ...greyUnits,
  ];
  return (
    <div className="flex h-full">
      <div className="flex flex-col items-center w-1/6 gap-2 h-full">
        {houseIsLoading ? (
          <Loading color="#94a3b8" />
        ) : (
          <div className="w-full">
            <img
              src={houseData?.avatar}
              className="w-full"
              alt={houseData?.name}
            />
            <div className="m-2">
              <h1 className="text-2xl">{houseData?.name}</h1>
            </div>
          </div>
        )}

        <div className="w-full px-2">
          <Label htmlFor="date-select">Select TW Date</Label>
          <Select onValueChange={(value) => setDate(value)}>
            <SelectTrigger id="date-select" className="mt-2 p-2 border rounded">
              <SelectValue placeholder={date} />
            </SelectTrigger>
            <SelectContent>
              {values.map((dateValue) => (
                <SelectItem key={dateValue} value={dateValue}>
                  {dateValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full px-2">
          <Label htmlFor="date-select">Select TW Lineup</Label>
          <Select onValueChange={(e) => setLineup(e)}>
            <SelectTrigger id="date-select" className="mt-2 p-2 border rounded">
              <SelectValue placeholder="Choice lineup" />
            </SelectTrigger>
            {datesIsLoading ? (
              <Loading color="#94a3b8" />
            ) : (
              <SelectContent>
                {lineupData?.map((e) => (
                  <SelectItem key={e.name} value={e.name}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>
      </div>
      <div className="flex justify-center items-center w-5/6">
        {lineupIsLoading ? (
          <Loading color="#94a3b8" />
        ) : !lineupData || !user?.user?.name ? (
          <div>No Data</div>
        ) : (
          <PreviewContainer
            username={user.user.name}
            lineup={lineup}
            house={house}
            canDelete={canDelete}
            date={date}
            units={units}
            data={lineupData}
          />
        )}
      </div>
    </div>
  );
};
export default Content;
// TODO translate
// TODO replace loadings with skieleton
