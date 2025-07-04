"use client";

import {
  getArtilleryAssets,
  getPublicLineupDates,
  getUnitsAssets,
  getWeaponsAssets,
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

  const { data: weaponsAssets, isLoading: weaponsAssetsLoading } = useQuery({
    queryKey: ["weaponsAssets"],
    queryFn: () => getWeaponsAssets(),
  });

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

  if (
    isLoading ||
    unitsAssetsLoading ||
    artilleryAssetsLoading ||
    weaponsAssetsLoading
  )
    return <LoadingComponent />;
  if (!data || !date || !unitsAssets || !artilleryAssets || !weaponsAssets)
    return <NoData />;

  return (
    <div className="flex justify-center w-full relative">
      <Content
        weapons={weaponsAssets}
        date={date}
        house={house}
        units={units}
        lineupName={urlName}
        artillery={artilleryAssets}
      />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-full bg-background px-1 py-2 shadow-lg">
        <DateSelector
          currentDate={date}
          dates={data}
          onChangeDate={onChangeDate}
        />
      </div>
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
        <div className="rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-accent hover:text-background">
          {currentDate}
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto" aria-description="Change Date">
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
