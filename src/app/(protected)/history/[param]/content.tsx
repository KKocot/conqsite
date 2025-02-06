import { useSession } from "next-auth/react";
import AddDialog from "../../../../feature/tw-history/dialog";
import { useQuery } from "@tanstack/react-query";
import { getHistoryPostsByDate } from "@/lib/get-data";
import TWCard from "@/feature/tw-history/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-2 my-4">
        {dates ? (
          <Select onValueChange={setDate} defaultValue={date}>
            <SelectTrigger className="w-fit self-end mx-4">
              <SelectValue>{date?.split("T")[0]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {dates.map((date) => (
                <SelectItem key={date} value={date}>
                  {date.split("T")[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>
      {latestTWLoading ? (
        <div>Loading...</div>
      ) : !latesTW ? (
        <div className="w-full">No data</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols3 justify-center">
          {latesTW?.map((tw) => (
            <li key={tw._id}>
              <TWCard data={tw} />
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
