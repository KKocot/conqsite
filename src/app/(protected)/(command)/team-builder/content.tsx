"use client";

import { Button } from "@/components/ui/button";
import { ArtilleryProps, SheetTypes } from "@/lib/type";
import { getLineup } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "react-loading";
import clsx from "clsx";
import { weapons } from "@/assets/weapons";
import Item from "@/components/sheet-form-item";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { others } from "@/assets/other-units-data";
import Preview from "@/components/preview";
import { useTranslations } from "next-intl";
import { ScanEye } from "lucide-react";
import UsersList from "@/components/users-list";
import TemplateMenu from "@/components/templates-menu";
import UnitsFilter from "@/components/units-filter";
import RaidsFilter from "@/components/raids-filter";
import StorageTemplate from "@/components/storage-template";
import { getNextTWLineups, getSurveys, Survey } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CARD } from "@/lib/defaults";
import Link from "next/link";

interface PageProps {
  house: string;
  nextTW: string;
}

const Content: React.FC<PageProps> = ({ house, nextTW }) => {
  const t = useTranslations("BuildTeam");
  const [userList, setUserList] = useState<Survey[]>([]);
  const [sheetData, setSheetData] = useState<SheetTypes[]>([]);
  const [allPlayers, setAllPlayers] = useState<Survey[]>([]);
  const [lineup, setLineup] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [filterUnits, setFilterUnits] = useState({
    rustic_checked: true,
    chivalric_checked: true,
    silver_checked: true,
    heroic_checked: true,
    golden_checked: true,
    other_checked: true,
    meta_units_only: true,
  });

  const { data: signupData, isLoading: lineupIsLoading } = useQuery({
    queryKey: ["lineup", house],
    queryFn: () => getNextTWLineups(house, nextTW),
    enabled: !!house,
  });
  const { data: surveysData, isLoading: surveysIsLoading } = useQuery({
    queryKey: ["surveysList"],
    queryFn: () => getSurveys(house),
    enabled: !!house,
  });
  const units = useMemo(() => {
    const golden_era = filterUnits.golden_checked ? goldenUnits : [];
    const heroic_era = filterUnits.heroic_checked ? heroicUnits : [];
    const silver_era = filterUnits.silver_checked ? blueUnits : [];
    const chivalric_era = filterUnits.chivalric_checked ? greenUnits : [];
    const rustic_era = filterUnits.rustic_checked ? greyUnits : [];
    const others_unit = filterUnits.other_checked ? others : [];
    return [
      ...golden_era,
      ...heroic_era,
      ...silver_era,
      ...chivalric_era,
      ...rustic_era,
      ...others_unit,
    ];
  }, [
    filterUnits.golden_checked,
    filterUnits.heroic_checked,
    filterUnits.silver_checked,
    filterUnits.chivalric_checked,
    filterUnits.rustic_checked,
    filterUnits.other_checked,
  ]);

  useEffect(() => {
    setAllPlayers(getLineup(surveysData, lineup) ?? []);
  }, [lineup.length]);

  const handleEdit = (
    index: number,
    username: string,
    unit1: string,
    unit2: string,
    unit3: string,
    weapon: string,
    description: string,
    color: string,
    artillery: ArtilleryProps[]
  ) => {
    setSheetData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              username: username,
              unit1: unit1,
              unit2: unit2,
              unit3: unit3,
              weapon: weapon,
              description: description,
              color: color,
              artillery: artillery,
            }
          : item
      )
    );
  };
  useEffect(() => {
    setSheetData((prev) => {
      const requiredLength = allPlayers.length + 10;
      if (prev.length < requiredLength) {
        const newCards = Array.from(
          { length: requiredLength - prev.length },
          () => DEFAULT_CARD
        );
        return [...prev, ...newCards];
      } else if (prev.length > requiredLength) {
        return prev.slice(0, requiredLength);
      }
      return prev;
    });
  }, [allPlayers.length, surveysData]);
  useEffect(() => {
    setUserList(
      allPlayers.filter(
        (user) =>
          !sheetData.some(
            (input) =>
              user.inGameNick.toLocaleLowerCase() ===
              input.username.toLocaleLowerCase()
          )
      )
    );
  }, [JSON.stringify(sheetData)]);

  if (lineupIsLoading || surveysIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  if (!signupData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Button variant="custom">
          <Link href="/settings">Finish House Settings first</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex items-center justify-around bg-indigo-950 w-3/4">
        <Button
          onClick={() => setShowPreview(!showPreview)}
          variant="tab"
          className="rounded-none"
        >
          <ScanEye className="h-5 w-5" />
          {showPreview ? t("editor") : t("preview")}
        </Button>
        <StorageTemplate
          house={house}
          data={sheetData}
          setData={setSheetData}
          playersNum={allPlayers.length}
        />
        <div className="flex gap-4">
          <UnitsFilter filters={filterUnits} setFilter={setFilterUnits} />
          <RaidsFilter
            lineups={signupData?.lineup}
            setLineup={setLineup}
            setAllPlayers={setAllPlayers}
            surveys={surveysData}
          />
        </div>
      </div>
      <TemplateMenu
        userHouse={house}
        data={sheetData}
        setData={setSheetData}
        players={allPlayers}
      />
      <div className={clsx("flex flex-col gap-5 p-2", { hidden: showPreview })}>
        <UsersList players={allPlayers} allPlayers={userList} />
        <div className="flex justify-center gap-2">
          <span className="text-yellow-500">{t("maxed_and_preffer")}</span>
          <span className="text-purple-500">{t("preffer")}</span>
          <span className="text-blue-500">{t("maxed")}</span>
          <span className="text-green-500">{t("i_have")}</span>
        </div>
        <ul className="grid grid-cols-5 gap-8">
          {sheetData.map((e, index) => (
            <Item
              users={userList}
              weapons={weapons}
              key={index}
              index={index}
              units={
                filterUnits.meta_units_only
                  ? units.filter((e) => e.value > 7)
                  : units
              }
              data={e}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
      <div className={clsx({ hidden: !showPreview })}>
        <Preview data={sheetData} units={units} />
      </div>
    </div>
  );
};

export default Content;
// TODO translation
