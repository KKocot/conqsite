import { SheetTypes } from "./type";
import { getCloserDay } from "./utils";

export interface Roles {
  _id?: string;
  discordId: string;
  house: string;
  role: string;
  discordNick: string;
}

export const getRoleById = async (id: string): Promise<Roles> => {
  const response = await fetch(`/api/roles?id=${id}`);
  const result = await response.json();
  return result.role;
};
export interface HouseDetails {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}

export const getHouseDetails = async (house: string): Promise<HouseDetails> => {
  const response = await fetch(`/api/house?name=${house}`);
  const result = await response.json();
  return result;
};
export const getHousesDetails = async (): Promise<HouseDetails[]> => {
  const response = await fetch(`/api/house`);
  const result = await response.json();
  return result;
};

export interface HouseSettings {
  name: string;
  id: string;
  member: { name: string; id: string };
  lineup: { name: string; id: string; roleId: string }[];
  logs: { logs: string; attendance: string };
  tw: { server: string; member: string };
}

export const getHouseSettings = async (
  name: string
): Promise<HouseSettings> => {
  const response = await fetch(`/api/houseSettings?name=${name}`);
  const result = await response.json();
  return result;
};

export interface Survey {
  _id?: string;
  discordNick: string;
  inGameNick: string;
  discordId: string;
  characterLevel: string;
  avatar?: string;
  house: string[] | string;
  artyAmount: "none" | "some" | "average" | "aLot";
  weapons: { value: boolean; leadership: number; pref?: number }[];
  units: {
    low: { id: number; value: string }[];
    heroic: { id: number; value: string }[];
    golden: { id: number; value: string }[];
  };
}

export const getSurveys = async (house: string): Promise<Survey[]> => {
  const response = await fetch(`/api/survey?house=${house}`);
  const result = await response.json();
  return result.surveys;
};

export const getSurvey = async (discordId: string): Promise<Survey> => {
  const response = await fetch(`/api/survey/${discordId}`);
  const result = await response.json();
  return result.survey;
};

interface Signup {
  name: string;
  signup: string[];
}

interface LineupData {
  date: string;
  house: string;
  lineup: Signup[];
}
export const getNextTWLineups = async (house: string): Promise<LineupData> => {
  const next_tw = getCloserDay();
  const response = await fetch(
    `/api/attendance?house=${house}&date=${next_tw}`
  );
  const result = await response.json();
  return result.attendance[0];
};

interface Template {
  _id: string;
  house: string;
  templateName: string;
  sheet: SheetTypes[];
}

export const getTemplates = async (
  house: string
): Promise<Template[] | undefined> => {
  const response = await fetch(`/api/template?house=${house}`);
  const result = await response.json();
  return result.templates;
};
