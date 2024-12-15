import { SheetTypes } from "./type";

export interface Roles {
  _id?: string;
  discordId: string;
  house: string;
  role: string;
  discordNick: string;
}

export const getRoleById = async (id: string): Promise<Roles[]> => {
  const response = await fetch(`/api/roles?id=${id}`);
  const result = await response.json();
  return result.roles;
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
export const getNextTWLineups = async (
  house: string,
  nextTW: string
): Promise<LineupData> => {
  const response = await fetch(`/api/attendance?house=${house}&date=${nextTW}`);
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

export interface PublicLineup {
  house: string;
  name: string;
  date: string;
  sheet: SheetTypes[];
}
export const getPublicLineup = async (
  house: string,
  date: string
): Promise<PublicLineup[]> => {
  const response = await fetch(`/api/publicLineup?house=${house}&date=${date}`);
  const result = await response.json();
  return result.publicLineup;
};
export const getPublicLineupDates = async (
  house: string
): Promise<string[]> => {
  const response = await fetch(`/api/publicLineup?house=${house}`);
  const result = await response.json();
  return result;
};

interface UsersStats {
  id: string;
  house: string;
  attendance: string[];
}

export const getUserStats = async (id: string): Promise<UsersStats> => {
  const response = await fetch(`/api/userStats?id=${id}`);
  const result = await response.json();
  return result;
};

interface BotSettings {
  status: string;
}

export const getBotSettings = async (
  guild_id: string,
  member_id: string,
  member: string,
  logs: string,
  attendance: string,
  tw_server: string,
  tw_member: string
): Promise<BotSettings> => {
  const response = await fetch(
    `/api/bot/settingsVerification?guild_id=${guild_id}&member_id=${member_id}&member=${member}&logs=${logs}&attendance=${attendance}&tw_server=${tw_server}&tw_member=${tw_member}`
  );
  const result = await response.json();
  return result;
};

export interface DiscordProps {
  status: "ok" | "error";
  error: string;
  roles: { id: number; label: string }[];
  channels: { id: number; label: string }[];
  twRoles: { id: number; label: string }[] | null;
}
export const getDiscordData = async (
  member_id: string,
  values: { guild_id: string; tw_discord: string; anotherDC: boolean }
): Promise<DiscordProps> => {
  const tw_server = values.anotherDC ? values.tw_discord : values.guild_id;
  const response = await fetch(
    `/api/discord-data?guild_id=${values.guild_id}&member_id=${member_id}&tw_server=${tw_server}`
  );
  const result = await response.json();
  return result;
};

export interface DiscordUsersProps {
  status: "ok" | "error";
  error: string;
  users: { id: string; username: string }[];
}

export const getDiscordUsers = async (
  guild_id: string,
  member_id: string,
  member_role: string
): Promise<DiscordUsersProps> => {
  const response = await fetch(
    `/api/discord-data/userlist?guild_id=${guild_id}&member_id=${member_id}&member_role=${member_role}`
  );
  const result = await response.json();
  return result;
};
