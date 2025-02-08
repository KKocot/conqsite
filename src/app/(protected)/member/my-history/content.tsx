import { useSession } from "next-auth/react";
import AddDialog from "../../../../feature/tw-history/dialog";
import { useQuery } from "@tanstack/react-query";
import { getHistoryPostsByUser } from "@/lib/get-data";
import TWCard from "@/feature/tw-history/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoData from "@/feature/ifs/no-data";
import LoadingComponent from "@/feature/ifs/loading";

interface TWHistory {
  dates: string[] | undefined;
}

const Content = ({ dates }: TWHistory) => {
  const { data } = useSession();
  const [date, setDate] = useState<string | undefined>(dates?.[0] ?? undefined);
  const { data: latesTW, isLoading: latestTWLoading } = useQuery({
    queryKey: ["latestTW", data?.user.id, date],
    queryFn: () => getHistoryPostsByUser(date ?? ""),
    enabled: !!date,
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
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols3 justify-center">
          {latesTW?.map((tw) => (
            <li key={tw._id}>
              <TWCard data={tw} pageType="user" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Content;
