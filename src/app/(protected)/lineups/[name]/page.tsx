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
  BorderColorProps,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

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
      // const response = await fetch(`/api/signup/${next_tw}`);
      const response = await fetch(`/api/signup/2024-06-22`);
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
        color: "slate",
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
    color: BorderColorProps
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
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Ukryj" : "Podglad"}
        </Button>
        <Button
          onClick={() => {
            setSheetData(addUsers(sheetData, userList)), setReload(!reload);
          }}
        >
          Autosort
        </Button>
        <Button
          onClick={() =>
            setSheetData(
              Array.from({ length: sortedUsers.length }, () => ({
                username: "",
                unit1: "",
                unit2: "",
                unit3: "",
                weapon: "",
                description: "",
                color: "slate",
              }))
            )
          }
        >
          Wyczysc
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nick</TableHead>
              <TableHead>Pierwsza Jednostka</TableHead>
              <TableHead>Druga Jednostka</TableHead>
              <TableHead>Trzecia Jednostka</TableHead>
              <TableHead>Bron</TableHead>
              <TableHead className="text-right">Opis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sheetData.map((e, index) => {
              const unit1 = units.find((unit) => unit.name === e.unit1);
              const unit2 = units.find((unit) => unit.name === e.unit2);
              const unit3 = units.find((unit) => unit.name === e.unit3);
              const weapon = weapons.find((w) => w.name === e.weapon);
              return (
                <TableRow
                  key={index}
                  className={clsx(
                    "bg-t-4 p-2 text-white font-extrabold bg-gradient-to-r to-slate-950 to-10%",
                    {
                      "from-red-800": "red" === e.color,
                      "from-blue-800": "blue" === e.color,
                      "dark:from-slate-950 from-slate-800": "slate" === e.color,
                      "from-cyan-800": "cyan" === e.color,
                      "from-neutral-800": "neutral" === e.color,
                      "from-stone-800": "stone" === e.color,
                      "from-orange-800": "orange" === e.color,
                      "from-amber-800": "amber" === e.color,
                      "from-yellow-800": "yellow" === e.color,
                      "from-lime-800": "lime" === e.color,
                      "from-green-800": "green" === e.color,
                      "from-emerald-800": "emerald" === e.color,
                      "from-teal-800": "teal" === e.color,
                      "from-sky-800": "sky" === e.color,
                      "from-indigo-800": "indigo" === e.color,
                      "from-violet-800": "violet" === e.color,
                      "from-purple-800": "purple" === e.color,
                      "from-fuchsia-800": "fuchsia" === e.color,
                      "from-pink-800": "pink" === e.color,
                      "from-rose-800": "rose" === e.color,
                    }
                  )}
                >
                  <TableCell>{e.username}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={unit1?.name}>
                        <AvatarImage alt={unit1?.name} src={unit1?.icon} />
                      </Avatar>
                      <span>{unit1?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={unit2?.name}>
                        <AvatarImage alt={unit2?.name} src={unit2?.icon} />
                      </Avatar>
                      <span>{unit2?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={unit3?.name}>
                        <AvatarImage alt={unit3?.name} src={unit3?.icon} />
                      </Avatar>
                      <span>{unit3?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8" title={weapon?.name}>
                        <AvatarImage
                          className="rounded-full"
                          alt={weapon?.name}
                          src={weapon?.src}
                        />
                      </Avatar>
                      <span>{weapon?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{e.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
