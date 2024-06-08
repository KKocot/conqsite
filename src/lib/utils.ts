import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemProps } from "./type";

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

  return `${year}-${date}-${month}`;
}
export function getCloserDay() {
  const nextTuesday = getNextDay("Tuesday");
  const nextSaturday = getNextDay("Saturday");

  return nextTuesday < nextSaturday ? nextTuesday : nextSaturday;
}

export function getLineup(lineup: string, signup: ItemProps) {
  switch (lineup) {
    case "one":
      return signup.lineup_1;
    case "two":
      return signup.lineup_2;
    case "three":
      return signup.lineup_3;
    case "four":
      return signup.lineup_4;
    default:
      return [];
  }
}

export function getLineupName(lineup: string) {
  switch (lineup) {
    case "one":
      return "Szara Straż";
    case "two":
      return "Tarcza Króla";
    case "three":
      return "Czerwona Flota";
    case "four":
      return "Biedna Piechota";
    default:
      return "Nieznany skład";
  }
}
