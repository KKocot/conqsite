"use client";

import { getPublicLineupDates, getUnitsAssets } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Content from "./content";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Lineups");
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const { data, isLoading } = useQuery({
    queryKey: ["lineupsDates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });
  const { data: unitsAssets, isLoading: unitsAssetsLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: () => getUnitsAssets(),
    enabled: true,
  });
  const [date, setDate] = useState<string>("");

  const latestDate = data ? data[0] : "";
  useEffect(() => {
    if (latestDate) setDate(latestDate);
  }, [latestDate]);
  if (isLoading || unitsAssetsLoading) return <LoadingComponent />;
  if (!data || !date || !unitsAssets) return <NoData />;
  const { goldenEra, heroicEra, blueEra, greenEra, greyEra, otherEra } =
    unitsAssets;
  const units = [
    ...goldenEra,
    ...heroicEra,
    ...blueEra,
    ...greenEra,
    ...greyEra,
    ...otherEra,
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
            <SheetTitle>{t("change_data")}</SheetTitle>
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
