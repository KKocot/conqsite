"use client";

import { getPublicLineupDates } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Page = () => {
  const { param: house }: { param: string } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["lineupsDates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });
  const [date, setDate] = useState<string>("");

  const latestDate = data ? data[0] : "";
  useEffect(() => {
    if (latestDate) setDate(latestDate);
  }, [latestDate]);
  if (isLoading) return <LoadingComponent />;
  if (!data || !date) return <NoData />;
  const units = [
    ...goldenUnits,
    ...heroicUnits,
    ...blueUnits,
    ...greenUnits,
    ...greyUnits,
  ];

  return (
    <div className="flex justify-center w-full">
      <Content date={date} house={house} units={units} />
      <Sheet>
        <SheetTrigger asChild>
          <Button className="absolute right-0">{date}</Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Change date</SheetTitle>
          </SheetHeader>
          <div className="p-4 flex flex-col gap-4">
            {data.map((e) => (
              <SheetClose asChild key={e}>
                <Button onClick={() => setDate(e)} variant="custom">
                  {e}
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Page;
