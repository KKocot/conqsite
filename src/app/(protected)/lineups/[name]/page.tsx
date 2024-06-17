"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { lowUnits } from "@/assets/low-units-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCloserDay, getLineup, getLineupName } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ItemProps, SheetTypes, SurveyProps, Unit } from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import CheckboxItem from "@/components/sheet-form-filter";
import { weapons } from "@/assets/weapons";
import Item from "@/components/sheet-form-item";
import clsx from "clsx";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const others = [
  {
    era: "other",
    icon: "",
    id: 90,
    leadership: 1,
    masteryPoints: false,
    name: "Kwawaleria",
    src: "",
    value: 1,
  },
  {
    era: "other",
    icon: "",
    id: 91,
    leadership: 1,
    masteryPoints: false,
    name: "Antykawaleria",
    src: "",
    value: 1,
  },
  {
    era: "other",
    icon: "",
    id: 92,
    leadership: 1,
    masteryPoints: false,
    name: "Zbrojna Piechota",
    src: "",
    value: 1,
  },
  {
    era: "other",
    icon: "",
    id: 93,
    leadership: 1,
    masteryPoints: false,
    name: "Specjalne",
    src: "",
    value: 1,
  },
] as Unit[];

const Page: React.FC = () => {
  const params = useParams<{ name: string }>();
  const [signup, setSignup] = useState<ItemProps>();
  const [surveys, setSurveys] = useState<SurveyProps[]>();
  const [filterUnits, setFilterUnits] = useState({
    rustic_checked: true,
    chivalric_checked: true,
    silver_checked: true,
    heroic_checked: true,
    golden_checked: true,
    other_checked: true,
  });

  const units = useMemo(() => {
    const blueUnits = lowUnits.filter((unit) => unit.era === "blue");
    const greenUnits = lowUnits.filter((unit) => unit.era === "green");
    const greyUnits = lowUnits.filter((unit) => unit.era === "grey");
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
    lowUnits,
    filterUnits.golden_checked,
    filterUnits.heroic_checked,
    filterUnits.silver_checked,
    filterUnits.chivalric_checked,
    filterUnits.rustic_checked,
    filterUnits.other_checked,
    goldenUnits,
    heroicUnits,
    others,
  ]);

  const next_tw = getCloserDay();
  const fetchLineup = async () => {
    try {
      // const response = await fetch(`/api/signup/${next_tw}`);
      const response = await fetch(`/api/signup/2024-08-06`);
      const data = await response.json();
      setSignup(data.signup);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  const fetchSurveys = async () => {
    try {
      const response = await fetch(`/api/survey`);
      const data = await response.json();
      setSurveys(data.surveys);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchLineup();
    fetchSurveys();
  }, []);
  const [sortedUsers, setSortedUsers] = useState<SurveyProps[]>([]);
  const lineup_name = getLineupName(params.name);
  const [storage, setStorage] = useLocalStorage<SheetTypes[]>(
    `sheetData_${lineup_name}`,
    []
  );
  const [sheetData, setSheetData] = useState<SheetTypes[]>([]);
  const [userList, setUserList] = useState<SurveyProps[]>([]);

  useEffect(() => {
    setSheetData(
      Array.from({ length: sortedUsers.length }, () => ({
        username: "",
        unit1: "",
        unit2: "",
        unit3: "",
        weapon: "",
        description: "",
      }))
    );

    if (surveys && signup) {
      setSortedUsers(
        surveys.filter((survey) =>
          getLineup(params.name, signup).includes(survey.discordId)
        )
      );
    }
  }, [sortedUsers.length, surveys]);
  useEffect(() => {
    setUserList(
      sortedUsers.filter(
        (user) =>
          !sheetData.some(
            (input) =>
              user.inGameNick.toLocaleLowerCase() ===
              input.username.toLocaleLowerCase()
          )
      )
    );
  }, [JSON.stringify(sheetData)]);
  const handleEdit = (
    index: number,
    username: string,
    unit1: string,
    unit2: string,
    unit3: string,
    weapon: string,
    description: string
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
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-5 p-2">
      <h1 className="text-5xl font-bold text-center">{lineup_name}</h1>
      <div className="flex justify-center gap-2">
        <Button onClick={() => setStorage(sheetData)}>Zapisz szablon</Button>
        <Button onClick={() => setSheetData(storage)}>Zaladuj szablon</Button>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Filtry</AccordionTrigger>
          <AccordionContent className="flex justify-around p-2 flex-wrap">
            <CheckboxItem
              checked={filterUnits.golden_checked}
              label="Epoka Złota"
              onChange={() =>
                setFilterUnits((prev) => ({
                  ...prev,
                  golden_checked: !prev.golden_checked,
                }))
              }
            />
            <CheckboxItem
              checked={filterUnits.heroic_checked}
              label="Epoka Heroiczna"
              onChange={() =>
                setFilterUnits((prev) => ({
                  ...prev,
                  heroic_checked: !prev.heroic_checked,
                }))
              }
            />
            <CheckboxItem
              checked={filterUnits.silver_checked}
              label="Epoka Srebrna"
              onChange={() =>
                setFilterUnits((prev) => ({
                  ...prev,
                  silver_checked: !prev.silver_checked,
                }))
              }
            />
            <CheckboxItem
              checked={filterUnits.chivalric_checked}
              label="Epoka Rycerska"
              onChange={() =>
                setFilterUnits((prev) => ({
                  ...prev,
                  chivalric_checked: !prev.chivalric_checked,
                }))
              }
            />
            <CheckboxItem
              checked={filterUnits.rustic_checked}
              label="Epoka Feudalna i Rustykalna"
              onChange={() =>
                setFilterUnits((prev) => ({
                  ...prev,
                  rustic_checked: !prev.rustic_checked,
                }))
              }
            />
            <CheckboxItem
              checked={filterUnits.other_checked}
              label="Ogolne"
              onChange={() =>
                setFilterUnits((prev) => ({
                  ...prev,
                  other_checked: !prev.other_checked,
                }))
              }
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-wrap gap-1">
        {sortedUsers.map((survey) => (
          <div key={survey.discordId}>
            <Link target="_blank" href={`/profile/${survey.discordId}`}>
              <Badge
                variant="secondary"
                className={clsx({
                  "bg-red-800 text-white hover:text-black dark:hover:text-white":
                    !userList.some((e) => e.discordId === survey.discordId),
                })}
              >
                {survey.inGameNick}
              </Badge>
            </Link>
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-5 gap-2">
        {sheetData.map((e, index) => (
          <Item
            users={userList}
            weapons={weapons}
            key={index}
            index={index}
            units={units}
            data={e}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default Page;
