"use client";

import {
  command_whitelist_erebus,
  command_whitelist_kop,
} from "@/assets/whitelists";
import { Button } from "@/components/ui/button";
import { ArtilleryProps, SheetTypes, SurveyProps } from "@/lib/type";
import { getCloserDay } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckboxItem from "@/components/sheet-form-filter";
import { UserProfile } from "@/components/user-profile";
import Loading from "react-loading";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { weapons } from "@/assets/weapons";
import Item from "@/components/sheet-form-item";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { others } from "@/assets/other-units-data";
import Preview from "@/components/preview";
import { useLocalStorage } from "usehooks-ts";
import { useTranslations } from "next-intl";

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
  const [storage, setStorage] = useLocalStorage<SheetTypes[]>(`sheetData`, []);
  const [filterUnits, setFilterUnits] = useState({
    rustic_checked: true,
    chivalric_checked: true,
    silver_checked: true,
    heroic_checked: true,
    golden_checked: true,
    other_checked: true,
    meta_units_only: true,
  });
  const [lineupFilterKoP, setLineupFilterKoP] = useState({
    ko_checked: false,
    kt_checked: false,
  });
  const [lineupFilterErebus, setLineupFilterErebus] = useState({
    raid_1: false,
    raid_2: false,
  });
  const commander_house = command_whitelist_kop.includes(
    commander?.user?.id ?? ""
  )
    ? "KingdomOfPoland"
    : command_whitelist_erebus.includes(commander?.user?.id ?? "")
    ? "Erebus"
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
            }
          : house === "Erebus"
          ? { lineup_4: data.signup.lineup_4, lineup_5: data.signup.lineup_5 }
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
    return [
      lineupFilterKoP.ko_checked ? lineup_ko : [],
      lineupFilterKoP.kt_checked ? lineup_kt : [],
    ];
  }, [lineupFilterKoP.ko_checked, lineupFilterKoP.kt_checked]);
  const erebus_players_list = useMemo(() => {
    if (!surveys || !signup) return [];
    const lineup_raid_1 = getLineup(surveys, signup?.lineup_4 ?? []);
    const lineup_raid_2 = getLineup(surveys, signup?.lineup_5 ?? []);
    return [
      lineupFilterErebus.raid_1 ? lineup_raid_1 : [],
      lineupFilterErebus.raid_2 ? lineup_raid_2 : [],
    ].filter(Array.isArray); // Ensure only arrays are returned
  }, [lineupFilterErebus.raid_1, lineupFilterErebus.raid_2]);

  const all_players_list: SurveyProps[] = [
    ...kop_players_list,
    ...erebus_players_list,
  ].flat();
  function handlerGetData() {
    fetchLineup(commander_house);
    fetchSurveys(commander_house);
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
    <div>
      <div className="flex p-4 items-center justify-around">
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? t("editor") : t("preview")}
        </Button>
        <div className="flex justify-center gap-4">
          <Button
            size="sm"
            onClick={() => setStorage(sheetData)}
            variant="success"
            className="text-white"
          >
            {t("save_template")}
          </Button>
          <Button
            size="sm"
            onClick={() => setSheetData(storage)}
            disabled={all_players_list.length === 0}
          >
            {t("load_template")}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              setSheetData(() => {
                const requiredLength = all_players_list.length + 10;
                return Array.from(
                  { length: requiredLength },
                  () => DEFAULT_CARD
                );
              })
            }
          >
            {t("clean_sheet")}
          </Button>
        </div>
      </div>
      <div className={clsx("flex flex-col gap-5 p-2", { hidden: showPreview })}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6">{t("units")}</AccordionTrigger>
            <AccordionContent className="flex justify-around p-2 flex-wrap">
              <CheckboxItem
                checked={filterUnits.meta_units_only}
                label={t("meta_units_only")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    meta_units_only: !prev.meta_units_only,
                  }))
                }
              />
              <CheckboxItem
                checked={filterUnits.golden_checked}
                label={t("golden_era")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    golden_checked: !prev.golden_checked,
                  }))
                }
              />
              <CheckboxItem
                checked={filterUnits.heroic_checked}
                label={t("heroic_era")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    heroic_checked: !prev.heroic_checked,
                  }))
                }
              />
              <CheckboxItem
                checked={filterUnits.silver_checked}
                label={t("silver_era")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    silver_checked: !prev.silver_checked,
                  }))
                }
              />
              <CheckboxItem
                checked={filterUnits.chivalric_checked}
                label={t("knight_era")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    chivalric_checked: !prev.chivalric_checked,
                  }))
                }
              />
              <CheckboxItem
                checked={filterUnits.rustic_checked}
                label={t("feudal__and_rustical_era")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    rustic_checked: !prev.rustic_checked,
                  }))
                }
              />
              <CheckboxItem
                checked={filterUnits.other_checked}
                label={t("general")}
                onChange={() =>
                  setFilterUnits((prev) => ({
                    ...prev,
                    other_checked: !prev.other_checked,
                  }))
                }
              />
            </AccordionContent>
          </AccordionItem>
          {commander_house === "KingdomOfPoland" ? (
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6">
                {t("lineups")}
              </AccordionTrigger>
              <AccordionContent className="flex justify-around p-2 flex-wrap">
                <CheckboxItem
                  checked={lineupFilterKoP.ko_checked}
                  label="King's Order"
                  onChange={() =>
                    setLineupFilterKoP((prev) => ({
                      ...prev,
                      ko_checked: !prev.ko_checked,
                    }))
                  }
                />
                <CheckboxItem
                  checked={lineupFilterKoP.kt_checked}
                  label="Królewska Tarcza"
                  onChange={() =>
                    setLineupFilterKoP((prev) => ({
                      ...prev,
                      kt_checked: !prev.kt_checked,
                    }))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          ) : commander_house === "Erebus" ? (
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6">
                {t("lineups")}
              </AccordionTrigger>
              <AccordionContent className="flex justify-around p-2 flex-wrap">
                <CheckboxItem
                  checked={lineupFilterErebus.raid_1}
                  label="Raid 1"
                  onChange={() =>
                    setLineupFilterErebus((prev) => ({
                      ...prev,
                      raid_1: !prev.raid_1,
                    }))
                  }
                />
                <CheckboxItem
                  checked={lineupFilterErebus.raid_2}
                  label="Raid 2"
                  onChange={() =>
                    setLineupFilterErebus((prev) => ({
                      ...prev,
                      raid_2: !prev.raid_2,
                    }))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
        <div className="flex flex-wrap gap-2 p-4">
          {all_players_list.map((survey) => (
            <div key={survey.discordId}>
              <UserProfile player={survey}>
                <Badge
                  variant="secondary"
                  className={clsx({
                    "bg-red-800 text-white hover:text-black dark:hover:text-white":
                      !userList.some((e) => e.discordId === survey.discordId),
                  })}
                >
                  {survey.inGameNick}
                </Badge>
              </UserProfile>
            </div>
          ))}
        </div>
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
      <div className=" bg-red-700 bg-blue-700 bg-cyan-700 bg-neutral-700 bg-orange-700 bg-yellow-700 bg-lime-700 bg-teal-700 bg-sky-700 bg-indigo-700 bg-violet-700 bg-fuchsia-700 bg-rose-700 bg-slate-700 hidden from-red-700 from-blue-700 from-cyan-700 from-neutral-700 from-orange-700 from-yellow-700 from-lime-700 from-teal-700 from-sky-700 from-indigo-700 from-violet-700 from-fuchsia-700 from-rose-700 from-slate-700 border-red-700 border-blue-700 border-cyan-700 border-neutral-700 border-orange-700 border-yellow-700 border-lime-700 border-teal-700 border-sky-700 border-indigo-700 border-violet-700 border-fuchsia-700 border-rose-700 border-slate-700" />
    </div>
  );
};

export default Page;
