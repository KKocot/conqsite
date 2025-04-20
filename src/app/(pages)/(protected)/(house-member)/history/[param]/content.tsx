import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getHistoryPostsByDate, getRolesByHouseAndId } from "@/lib/get-data";
import TWCard from "@/feature/tw-history/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingComponent from "@/feature/ifs/loading";
import AddDialog from "@/feature/tw-history/dialog";

interface TWHistory {
  house: string;
  dates: string[] | undefined;
}

const Content = ({ house, dates }: TWHistory) => {
  const { data } = useSession();
  const [date, setDate] = useState<string | undefined>(dates?.[0] ?? undefined);
  const { data: latesTW, isLoading: latestTWLoading } = useQuery({
    queryKey: ["latestTW", house, date],
    queryFn: () => getHistoryPostsByDate(house, date ?? ""),
    enabled: !!date,
  });
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["roles", house],
    queryFn: () => getRolesByHouseAndId(house, data?.user.id ?? ""),
    enabled: !!house && !!data?.user.id,
  });

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-2 my-4">
        {dates?.length === 0 ? null : (
          <Select onValueChange={setDate} defaultValue={date}>
            <SelectTrigger className="w-fit self-end mx-4">
              <SelectValue>{date?.split("T")[0]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {dates?.map((date) => (
                <SelectItem key={date} value={date}>
                  {date.split("T")[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {latestTWLoading ? (
        <LoadingComponent />
      ) : !latesTW ? (
        <div className="w-full text-center text-2xl font-bold">
          No archive yet
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 justify-center">
          {latesTW?.map((tw) => (
            <li key={tw._id} className="flex justify-center">
              <TWCard
                data={tw}
                pageType="house"
                roleDisable={!role || roleLoading}
              />
            </li>
          ))}
        </ul>
      )}
      <AddDialog
        house={house}
        author={data?.user.name ?? "Unknown"}
        authorID={data?.user.id ?? "Unknown"}
      />
    </div>
  );
};
export default Content;
