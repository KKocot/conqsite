"use client";

import {
  getArtilleryAssets,
  getPublicLineupDates,
  getUnitsAssets,
} from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import Content from "./content";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";
import { useMemo, useCallback } from "react";
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
import useLineupDate from "@/components/hooks/use-lineup-date";

const Page = () => {
  const t = useTranslations("Lineups");
  const searchParams = useSearchParams();
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const urlDate = searchParams.get("date");
  const urlName = searchParams.get("name");

  const { data, isLoading } = useQuery({
    queryKey: ["lineupsDates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });
  const { data: unitsAssets, isLoading: unitsAssetsLoading } = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: () => getUnitsAssets(),
  });
  const { data: artilleryAssets, isLoading: artilleryAssetsLoading } = useQuery(
    {
      queryKey: ["artilleryAssets"],
      queryFn: () => getArtilleryAssets(),
    }
  );

  const latestDate = data ? data[0] : "";
  const [date, setDate] = useLineupDate(urlDate, latestDate);
  const units = useMemo(() => {
    if (!unitsAssets) return [];
    const { goldenEra, heroicEra, blueEra, greenEra, greyEra, otherEra } =
      unitsAssets;
    return [
      ...goldenEra,
      ...heroicEra,
      ...blueEra,
      ...greenEra,
      ...greyEra,
      ...otherEra,
    ];
  }, [unitsAssets]);

  const onChangeDate = useCallback(
    (newDate: string) => {
      setDate(newDate);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("date", newDate);
      newUrl.searchParams.set("name", urlName || "");
      window.history.pushState({}, "", newUrl);
    },
    [urlName]
  );

  if (isLoading || unitsAssetsLoading || artilleryAssetsLoading)
    return <LoadingComponent />;
  if (!data || !date || !unitsAssets || !artilleryAssets) return <NoData />;

  return (
    <div className="flex justify-center w-full">
      <Content
        date={date}
        house={house}
        units={units}
        lineupName={urlName}
        artillery={artilleryAssets}
      />
      <DateSelector
        currentDate={date}
        dates={data}
        onChangeDate={onChangeDate}
      />
    </div>
  );
};

const DateSelector = ({
  currentDate,
  dates,
  onChangeDate,
}: {
  currentDate: string;
  dates: string[];
  onChangeDate: (date: string) => void;
}) => {
  const t = useTranslations("Lineups");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute right-0">{currentDate}</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t("change_data")}</SheetTitle>
        </SheetHeader>
        <div className="p-4 flex flex-col gap-4">
          {dates.map((date) => (
            <SheetClose asChild key={date}>
              <Button onClick={() => onChangeDate(date)} variant="custom">
                {date}
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Page;
