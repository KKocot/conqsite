import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemProps, SheetTypes, SurveyProps } from "./type";

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

  return `${year}-${month}-${date}`;
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
      return "Friendship is Magic";
    case "two":
      return "King's Order";
    case "three":
      return "Czerwona Flota";
    case "four":
      return "Królewska Tarcza";
    default:
      return "Nieznany skład";
  }
}

export function getArtyAmount(
  amount: "none" | "some" | "average" | "aLot" | undefined
) {
  switch (amount) {
    case "none":
      return { title: "Nie ma artylerii", label: "Brak" };
    case "some":
      return { title: "Ma trochę artylerii", label: "Trochę" };
    case "average":
      return { title: "Ma średnią ilość artylerii", label: "Średnio" };
    case "aLot":
      return { title: "Ma dużo artylerii", label: "Dużo" };
    default:
      return { title: "", label: "" };
  }
}

export function addUsers(data: SheetTypes[], users: SurveyProps[]) {
  let userIndex = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].username === "") {
      if (userIndex < users.length) {
        data[i].username = users[userIndex].inGameNick;
        userIndex++;
      } else {
        break;
      }
    }
  }
  return data;
}
