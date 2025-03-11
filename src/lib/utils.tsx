import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Unit } from "./type";
import { useTranslations } from "next-intl";
import { Survey } from "./get-data";
import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getNextDay(dayOfWeek: string) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDay = days.indexOf(dayOfWeek);
  const today = new Date();
  const currentDay = today.getDay();

  let diff = targetDay - currentDay;

  if (diff < 0) {
    diff += 7;
  }

  today.setDate(today.getDate() + diff);

  // Format the date as a string in the format YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const date = String(today.getDate()).padStart(2, "0");

  return new Date(`${year}-${month}-${date}`);
}
export function getCloserDay() {
  const nextTuesday = getNextDay("Tuesday");
  const nextSaturday = getNextDay("Saturday");

  return nextTuesday < nextSaturday ? nextTuesday : nextSaturday;
}

export function useArtyAmount(
  amount: "none" | "some" | "average" | "aLot" | undefined
) {
  const t = useTranslations("BuildTeam.artillery");

  switch (amount) {
    case "none":
      return { title: t("no_artillery"), label: t("not_at_all") };
    case "some":
      return { title: t("some_artillery"), label: t("some") };
    case "average":
      return { title: t("average_artillery"), label: t("average") };
    case "aLot":
      return { title: t("a_lot_artillery"), label: t("a_lot") };
    default:
      return { title: "", label: "" };
  }
}

export function ownedUnits(
  units: Unit[],
  profile_units: { id: number; value: string; reduceCost?: boolean }[]
) {
  const mergedUnits = units.map((unit) => {
    const matchingUnit = profile_units.find((g) => g.id === unit.id);
    return { ...unit, matchingUnit };
  });
  return mergedUnits;
}

export function getLineup(surveys: Survey[] | undefined, lineup: string[]) {
  const data = surveys?.filter((survey) => lineup.includes(survey.discordId));
  return data;
}

export const servers = [
  "EU1",
  "EU2",
  "EU3",
  "EU4",
  "APAC7",
  "APAC1",
  "APAC2",
  "APAC6",
  "APAC3",
  "APAC5",
  "APAC4",
  "AM1",
  "MENA",
];

export function getUniqueValues(arr: string[]): string[] {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

export function getUnit(
  unitName: string,
  era: "golden" | "heroic" | "green" | "blue" | "grey"
) {
  const cleanUnitName = unitName?.replace(/_/g, " ");
  switch (era) {
    case "golden":
      return goldenUnits.find(
        (unit) => unit.name.toLocaleLowerCase() === cleanUnitName
      );
    case "heroic":
      return heroicUnits.find(
        (unit) => unit.name.toLocaleLowerCase() === cleanUnitName
      );
    case "green":
      return greenUnits.find(
        (unit) => unit.name.toLocaleLowerCase() === cleanUnitName
      );
    case "blue":
      return blueUnits.find(
        (unit) => unit.name.toLocaleLowerCase() === cleanUnitName
      );
    case "grey":
      return greyUnits.find(
        (unit) => unit.name.toLocaleLowerCase() === cleanUnitName
      );
    default:
      return null;
  }
}

export const createDateArray = (start: string, end: string): string[] => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArray: string[] = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const day = currentDate.getDay();
    if (day === 2 || day === 6) {
      // 2 is Tuesday, 6 is Saturday
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
      const date = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${date}`;
      dateArray.push(formattedDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};
interface NewUnit {
  id: number;
  value: string;
}

interface NewWeapon {
  value: boolean;
  leadership: number;
  pref?: number;
}

export const createNewUnits = (
  existingUnits: NewUnit[],
  diff: number,
  baseId: number
): NewUnit[] => {
  const newUnits: NewUnit[] = [];
  for (let i = 0; i < diff; i++) {
    newUnits.push({ id: baseId + i + 1, value: "0" });
  }
  return [...existingUnits, ...newUnits];
};
export const createNewWeapons = (
  existingWeapons: NewWeapon[],
  diff: number
) => {
  const newWeapons = [];
  for (let i = 0; i < diff; i++) {
    newWeapons.push({ value: false, leadership: 0, pref: 0 });
  }
  return [...existingWeapons, ...newWeapons];
};

// Function to let the bot know that an event has been updated.
export const pokeBotEvent = async (
  eventId: string,
  action: "create" | "edit" | "delete"
) => {
  try {
    await fetch(
      `/api/discord-bot/create-event?eventId=${eventId}&action=${action}`
    );
  } catch (error) {
    console.error("Failed to poke bot event", error);
  }
};

export const countLeadership = (units: Unit[], unit: string): number => {
  const matchedUnit = units.find((e) => e.name === unit);
  if (!matchedUnit) return 0;

  const discount = matchedUnit.reduceCost ? 0.84 : 1; // 16% discount means multiply by 0.84
  return matchedUnit.leadership * discount;
};
