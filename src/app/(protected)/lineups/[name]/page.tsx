"use client";

import React, { useEffect, useMemo, useState } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { lowUnits } from "@/assets/low-units-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addUsers, getCloserDay, getLineup, getLineupName } from "@/lib/utils";
import { useParams } from "next/navigation";
import {
  ArtilleryProps,
  ItemProps,
  SheetTypes,
  SurveyProps,
  Unit,
} from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import CheckboxItem from "@/components/sheet-form-filter";
import { weapons } from "@/assets/weapons";
import Item from "@/components/sheet-form-item";
import clsx from "clsx";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Preview from "@/components/preview";

const DEFAULT_ARTILLERY = [
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
] as ArtilleryProps[];

const others = [
  {
    era: "other",
    icon: "/others-units/cav.jpg",
    id: 90,
    leadership: 0,
    masteryPoints: false,
    name: "Kawaleria",
    src: "",
    value: 0,
  },
  {
    era: "other",
    icon: "/others-units/piki.jpg",
    id: 91,
    leadership: 0,
    masteryPoints: false,
    name: "Antykawaleria",
    src: "",
    value: 0,
  },
  {
    era: "other",
    icon: "/others-units/zbrojni.jpg",
    id: 92,
    leadership: 0,
    masteryPoints: false,
    name: "Zbrojna Piechota",
    src: "",
    value: 0,
  },
  {
    era: "other",
    icon: "/others-units/special.jpg",
    id: 93,
    leadership: 0,
    masteryPoints: false,
    name: "Specjalne",
    src: "",
    value: 0,
  },
] as Unit[];

const Page: React.FC = () => {
  const params = useParams<{ name: string }>();
  const [reload, setReload] = useState(false);
  const [signup, setSignup] = useState<ItemProps>();
  const [surveys, setSurveys] = useState<SurveyProps[]>();
  const [showPreview, setShowPreview] = useState(false);
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
      const response = await fetch(`/api/signup/${next_tw}`);
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
      Array.from({ length: sortedUsers.length + 20 }, () => ({
        username: "",
        unit1: "",
        unit2: "",
        unit3: "",
        weapon: "",
        description: "",
        color: "slate",
        artillery: DEFAULT_ARTILLERY,
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

  return (
    <div className="flex flex-col gap-5 p-2">
      <h1 className="text-5xl font-bold text-center">{lineup_name}</h1>
      <div className="flex justify-around gap-2">
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Edytor" : "Podglad"}
        </Button>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setStorage(sheetData)}
            variant="success"
          >
            Zapisz szablon
          </Button>
          <Button size="sm" onClick={() => setSheetData(storage)}>
            Zaladuj szablon
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              setSheetData(
                Array.from({ length: sortedUsers.length + 20 }, () => ({
                  username: "",
                  unit1: "",
                  unit2: "",
                  unit3: "",
                  weapon: "",
                  description: "",
                  color: "slate",
                  artillery: DEFAULT_ARTILLERY,
                }))
              )
            }
          >
            Wyczysc
          </Button>
        </div>
        <Button
          onClick={() => {
            setSheetData(addUsers(sheetData, userList)), setReload(!reload);
          }}
        >
          Autosort
        </Button>
      </div>

      <div className={clsx("flex flex-col gap-2", { hidden: showPreview })}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6">Filtry</AccordionTrigger>
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
        <div className="flex flex-wrap gap-2 p-4">
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
        <ul className="grid grid-cols-5 gap-8">
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
      <div className={clsx({ hidden: !showPreview })}>
        <Preview data={sheetData} units={units} />
      </div>

      <div className=" bg-red-700 bg-blue-700 bg-cyan-700 bg-neutral-700 bg-orange-700 bg-yellow-700 bg-lime-700 bg-teal-700 bg-sky-700 bg-indigo-700 bg-violet-700 bg-fuchsia-700 bg-rose-700 bg-slate-700 hidden from-red-700 from-blue-700 from-cyan-700 from-neutral-700 from-orange-700 from-yellow-700 from-lime-700 from-teal-700 from-sky-700 from-indigo-700 from-violet-700 from-fuchsia-700 from-rose-700 from-slate-700 border-red-700 border-blue-700 border-cyan-700 border-neutral-700 border-orange-700 border-yellow-700 border-lime-700 border-teal-700 border-sky-700 border-indigo-700 border-violet-700 border-fuchsia-700 border-rose-700border-slate-700" />
    </div>
  );
};

export default Page;
