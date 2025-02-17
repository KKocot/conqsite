import { date } from "zod";
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

export const getRolesByHouseAndId = async (
  house: string,
  id: string
): Promise<Roles[]> => {
  const response = await fetch(`/api/roles?house=${house}&id=${id}`);
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
  updates?: String[];
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

export interface SurveyList {
  discordId: string;
  inGameNick: string;
}

export const getSurveyList = async (house: string): Promise<SurveyList[]> => {
  const response = await fetch(`/api/survey?house=${house}&list=true`);
  const result = await response.json();
  return result.surveys;
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
    `/api/discord-bot/settingsVerification?guild_id=${guild_id}&member_id=${member_id}&member=${member}&logs=${logs}&attendance=${attendance}&tw_server=${tw_server}&tw_member=${tw_member}`
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
    `/api/discord-bot/discord-data?guild_id=${values.guild_id}&member_id=${member_id}&tw_server=${tw_server}`
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
    `/api/discord-bot/userlist?guild_id=${guild_id}&member_id=${member_id}&member_role=${member_role}`
  );
  const result = await response.json();
  return result;
};

export const getAddAll = async (house: string): Promise<{ status: string }> => {
  const response = await fetch(`/api/discord-bot/addAll?house=${house}`);
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

type SignUp = {
  name: string;
  status: string;
  lineup: string;
  userId: string;
};
export interface BotEvent {
  _id?: string;
  date_start_event: string;
  time_start_event: string;
  interval: number;
  activity_time: number;
  title: string;
  description: string;
  house_name: string;
  channel_id: string;
  role_id: string;
  signUps: SignUp[];
}

export const getBotEvent = async (house: string): Promise<BotEvent[]> => {
  const response = await fetch(`/api/event?house=${house}`);
  const result = await response.json();
  return result;
};

export interface AuthorityToken {
  id: string;
  name: string;
  image: string;
  token: string;
}

export const getBotToken = async (token: string): Promise<AuthorityToken> => {
  const response = await fetch(`/api/authority?token=${token}`);
  const result = await response.json();
  return result;
};

export interface UnitObject {
  name: string;
  icon: string;
  authors: string[];
  era: string;
  image: string;
  leadership?: string;
  value: number[];
  masteryPoints?: boolean;
  maxlvl: string;
  season: {
    number: string;
    name: string;
  };
  description?: string;
  skills: {
    name: string;
    description: string;
    image: string;
  }[];
  challenges: {
    tier: number;
    quests: string[];
  }[];
  formations: {
    name: string;
    description: string;
    image: string;
  }[];
  treeStructure: {
    name: string;
    description: string;
    img: string;
    prev: number | null;
    id: number;
    value: number;
  }[];
  status: "rejected" | "accepted" | "pending";
  reviewNotes?: string;
  _id?: string;
}

export const getUnitWiki = async (
  unit: string,
  status: "rejected" | "accepted" | "pending"
): Promise<UnitObject[]> => {
  const response = await fetch(`/api/units/wiki?name=${unit}&status=${status}`);
  const result = await response.json();
  return result;
};
export const getUnitsReview = async (
  status: "pending" | "accepted" | "rejected"
): Promise<UnitObject[]> => {
  const response = await fetch(`/api/units/wiki?status=${status}`);
  const result = await response.json();
  return result;
};

export const getUnitWikiById = async (id: string): Promise<UnitObject> => {
  const response = await fetch(`/api/units/wiki/${id}`);
  const result = await response.json();
  return result.wikiPost;
};

export const getSurveysAndHousesNumber = async (): Promise<{
  surveys: number;
  houses: number;
}> => {
  const response = await fetch(`/api/housesAndSurveysInfo`);
  const result = await response.json();
  return result;
};
export interface FilledSurveys {
  filled_surveys: number;
  not_filled_surveys: number;
}
export const getFilledSurveys = async (
  house: string
): Promise<FilledSurveys> => {
  const response = await fetch(`/api/survey/filled?house=${house}`);
  const result = await response.json();
  return result;
};

export interface HistoryPost {
  twDate: Date;
  ytUrl: string;
  title: string;
  description: string;
  visibleTo: string;
  author: string;
  house: string;
  publicDate: Date;
  authorID: string;
  _id?: string;
}

export const getHistoryPostsByDate = async (
  house: string,
  date: string
): Promise<HistoryPost[]> => {
  const response = await fetch(
    `/api/house/tw-history?house=${house}&date=${date}`
  );
  const result = await response.json();
  return result;
};

export const getHistoryDates = async (house: string): Promise<string[]> => {
  const response = await fetch(
    `/api/house/tw-history/list-of-dates?house=${house}`
  );
  const result = await response.json();
  return result;
};

export const getHistoryDatesByUser = async (): Promise<string[]> => {
  const response = await fetch(`/api/house/tw-history/list-of-dates`);
  const result = await response.json();
  return result;
};

export const getHistoryPostsByUser = async (
  date: string
): Promise<HistoryPost[]> => {
  const response = await fetch(`/api/house/tw-history?date=${date}`);
  const result = await response.json();
  return result;
};

export const getSurveysAdmin = async (): Promise<FilledSurveys> => {
  const response = await fetch(`/api/admin/surveys`);
  const result = await response.json();
  return result;
};
