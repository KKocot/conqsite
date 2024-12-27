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

export const getHighRoles = async (house: string): Promise<Roles[]> => {
  const response = await fetch(`/api/roles?house=${house}`);
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
  return result.surveys.filter(
    (e: Survey) => e.discordId !== "303156898532818944"
  );
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

export interface LineupData {
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

export interface Template {
  _id?: string;
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
  const result: string[] = await response.json();
  const uniqueDates = Array.from(new Set(result)).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  return uniqueDates;
};

export interface UsersStats {
  nick: string;
  id: string;
  house: string[];
  attendance: string[];
}

export const getUserStats = async (id: string): Promise<UsersStats> => {
  const response = await fetch(`/api/userStats?id=${id}`);
  const result = await response.json();
  return result;
};

export const getHouseStats = async (house: string): Promise<UsersStats[]> => {
  const response = await fetch(`/api/userStats?house=${house}`);
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
  roles: { id: string; label: string }[];
  channels: { id: string; label: string }[];
  twRoles: { id: string; label: string }[] | null;
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

export const getAddAll = async (house: string): Promise<{ status: string }> => {
  const response = await fetch(`/api/discord-data/addAll?house=${house}`);
  const result = await response.json();
  return result;
};

export interface SeasonProps {
  season: string;
  startDate: string;
  endDate: string;
  drillModes: string[];
}
export const getSeasons = async (): Promise<SeasonProps[]> => {
  const response = await fetch(`/api/seasons`);
  const result = await response.json();
  return result.seasons;
};

export interface UnitData {
  title: string;
  id: string;
  unit: string;
  ytlink: string;
  description: string;
  tree: { structure: Map<number, number>; maxlvl: number };
  doctrines: { id: number; name: string; img: string }[];
}

export const getUnitPosts = async (unit: string): Promise<UnitData[]> => {
  const response = await fetch(`/api/unitPost?unit=${unit}`);
  const result = await response.json();
  return result;
};

export interface HouseAssets {
  name: string;
  premium: boolean;
  sharedList: boolean;
  signupBot: string;
}

export const getHouseAssets = async (house: string): Promise<HouseAssets> => {
  const response = await fetch(`/api/houseAssets?name=${house}`);
  const result = await response.json();
  return result.houseAssets;
};

export const getHousesAssets = async (): Promise<HouseAssets[]> => {
  const response = await fetch(`/api/houseAssets`);
  const result = await response.json();
  return result.housesAssets;
};

export interface CyclicalEvents {
  _id?: string;
  event_template_id: string;
  date: string;
  time: string;
  interval: "TW" | "Never" | number;
  activity_time: number;
  title: string;
  description: string;
  guild_id: string;
  house_name: string;
  channel_id: string;
  role_id: string;
}

export const getCyclicalEvents = async (
  house: string
): Promise<CyclicalEvents[]> => {
  const response = await fetch(
    `/api/discord-data/event-controller?house-name=${house}`
  );
  const result = await response.json();
  return result;
};
