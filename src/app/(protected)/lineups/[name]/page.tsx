"use client";

import React, { use, useEffect, useState } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { lowUnits } from "@/assets/low-units-data";
import { Autocompleter } from "@/components/autocompleter";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { getCloserDay, getLineup, getLineupName } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ItemProps, SurveyProps, Unit } from "@/lib/type";
import { Badge } from "@/components/ui/badge";

const elements = Array.from({ length: 40 }, (_, index) => index + 1);
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
const Item = () => {
  const [unitValue, setUnitValue] = useState("");
  const [user, setUser] = useState("");
  const arrays = [...goldenUnits, ...heroicUnits, ...lowUnits, ...others];

  return (
    <li className="grid grid-cols-11 border-2 border-primary p-2 rounded-2xl items-center">
      <span className="col-span-2">
        <Input
          value={user}
          className="p-1"
          onChange={(e) => setUser(e.target.value)}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={unitValue}
          onChange={setUnitValue}
          items={arrays}
        />
      </span>
    </li>
  );
};

const CheckboxItem = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (e: boolean) => void;
}) => {
  return (
    <AccordionContent>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={label}
          checked={checked}
          onCheckedChange={(e) => {
            onChange(e as boolean);
          }}
        />
        <label
          htmlFor={label}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </AccordionContent>
  );
};

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

  const lineup = signup ? getLineup(params.name, signup) : [];
  const lineup_members = surveys
    ? surveys?.filter((survey) => lineup.includes(survey.discordId))
    : [];
  const lineup_name = getLineupName(params.name);
  return (
    <div className="flex flex-col gap-5 p-2">
      <h1 className="text-5xl font-bold text-center">{lineup_name}</h1>
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
        {lineup_members.map((survey) => (
          <div key={survey.discordId}>
            <Badge variant="secondary">{survey.inGameNick}</Badge>
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-2">
        {elements.map((index) => (
          <Item key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
