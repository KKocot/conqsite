"use client";

import { Button } from "@/components/ui/button";
import { ArtilleryProps, SheetTypes, SurveyProps } from "@/lib/type";
import { getCloserDay } from "@/lib/utils";
import { useSession } from "next-auth/react";
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
import { useRolesContext } from "@/components/providers/globalData";

const next_tw = getCloserDay();

const DEFAULT_CARD = {
  username: "",
  unit1: "",
  unit2: "",
  unit3: "",
  weapon: "",
  description: "",
  color: "slate",
  artillery: [
    { id: 1, check: false },
    { id: 2, check: false },
    { id: 3, check: false },
    { id: 4, check: false },
    { id: 5, check: false },
    { id: 6, check: false },
    { id: 7, check: false },
    { id: 8, check: false },
    { id: 9, check: false },
    { id: 10, check: false },
    { id: 11, check: false },
  ],
};

function getLineup(surveys: SurveyProps[] | undefined, lineup: string[]) {
  return surveys?.filter((survey) => lineup.includes(survey.discordId));
}

const Page: React.FC = () => {
  const { data: commander } = useSession();
  const t = useTranslations("BuildTeam");
  const [signup, setSignup] = useState<any>(null);
  const [surveys, setSurveys] = useState<SurveyProps[]>();
  const [noData, setNoData] = useState(true);
  const [userList, setUserList] = useState<SurveyProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [sheetData, setSheetData] = useState<SheetTypes[]>([]);

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
  const [filterLineup, setFilterLineup] = useState({
    ko: false,
    kt: false,
    zp: false,
    nashin: false,
    wallsy: false,
    blackforge_1: false,
    blackforge_2: false,
  });

  const command_list = useRolesContext();
  const commander_house =
    commander && commander.user.id
      ? command_list.find((e) => e.discordId === commander.user.id)
      : "";
  const fetchLineup = async (house: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/signup/${next_tw}`);
      const data = await response.json();
      const lineups =
        house === "KingdomOfPoland"
          ? {
              lineup_2: data.signup.lineup_2,
              lineup_3: data.signup.lineup_3,
              lineup_4: data.signup.lineup_4,
            }
          : house === "Erebus"
          ? { lineup_5: data.signup.lineup_5, lineup_6: data.signup.lineup_6 }
          : house === "BlackForge"
          ? { lineup_7: data.signup.lineup_7, lineup_8: data.signup.lineup_8 }
          : null;
      setSignup(lineups);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };
  const fetchSurveys = async (house: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/survey?house=${house}`);
      const data = await response.json();
      setSurveys(data.surveys);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

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
  const kop_players_list = useMemo(() => {
    if (!surveys || !signup) return [];
    const lineup_ko = getLineup(surveys, signup?.lineup_2 ?? []);
    const lineup_kt = getLineup(surveys, signup?.lineup_3 ?? []);
    const lineup_zp = getLineup(surveys, signup?.lineup_4 ?? []);
    return [
      filterLineup.ko ? lineup_ko : [],
      filterLineup.kt ? lineup_kt : [],
      filterLineup.zp ? lineup_zp : [],
    ].filter(Array.isArray);
  }, [filterLineup.ko, filterLineup.kt, filterLineup.zp]);
  const erebus_players_list = useMemo(() => {
    if (!surveys || !signup) return [];
    const lineup_raid_1 = getLineup(surveys, signup?.lineup_5 ?? []);
    const lineup_raid_2 = getLineup(surveys, signup?.lineup_6 ?? []);
    return [
      filterLineup.nashin ? lineup_raid_1 : [],
      filterLineup.wallsy ? lineup_raid_2 : [],
    ].filter(Array.isArray);
  }, [filterLineup.nashin, filterLineup.wallsy]);

  const blackforge_players_list = useMemo(() => {
    if (!surveys || !signup) return [];
    const lineup_raid_1 = getLineup(surveys, signup?.lineup_7 ?? []);
    const lineup_raid_2 = getLineup(surveys, signup?.lineup_8 ?? []);
    return [
      filterLineup.blackforge_1 ? lineup_raid_1 : [],
      filterLineup.blackforge_2 ? lineup_raid_2 : [],
    ].filter(Array.isArray); // Ensure only arrays are returned
  }, [filterLineup.blackforge_1, filterLineup.blackforge_2]);

  const all_players_list: SurveyProps[] = [
    ...kop_players_list,
    ...erebus_players_list,
    ...blackforge_players_list,
  ].flat();
  function handlerGetData() {
    if (!commander_house) return;
    fetchLineup(commander_house.house);
    fetchSurveys(commander_house.house);
    setNoData(false);
  }
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
      const requiredLength = all_players_list.length + 10;
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
  }, [all_players_list.length, surveys]);
  useEffect(() => {
    setUserList(
      all_players_list.filter(
        (user) =>
          !sheetData.some(
            (input) =>
              user.inGameNick.toLocaleLowerCase() ===
              input.username.toLocaleLowerCase()
          )
      )
    );
  }, [JSON.stringify(sheetData)]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }
  return noData ? (
    <div className="flex flex-col gap-5 p-2">
      <Button onClick={() => handlerGetData()}>{t("load_data")}</Button>
    </div>
  ) : (
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
          data={sheetData}
          setData={setSheetData}
          playersNum={all_players_list.length}
        />
        <div className="flex gap-4">
          <UnitsFilter filters={filterUnits} setFilter={setFilterUnits} />
          <RaidsFilter
            userHouse={commander_house ? commander_house.house : ""}
            filter={filterLineup}
            setFilter={setFilterLineup}
          />
        </div>
      </div>
      <TemplateMenu
        userHouse={commander_house ? commander_house.house : ""}
        data={sheetData}
        setData={setSheetData}
        players={all_players_list}
      />
      <div className={clsx("flex flex-col gap-5 p-2", { hidden: showPreview })}>
        <UsersList players={all_players_list} allPlayers={userList} />
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

export default Page;
