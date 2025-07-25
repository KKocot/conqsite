import { Plan } from "@/feature/map-editor/lib/types";
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
    low: { id: number; value: string; reduceCost?: boolean }[];
    heroic: { id: number; value: string; reduceCost?: boolean }[];
    golden: { id: number; value: string; reduceCost?: boolean }[];
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

export const getSubSurves = async (discordId: string): Promise<Survey[]> => {
  const response = await fetch(`/api/survey/sub-acc/${discordId}`);
  const result = await response.json();
  return result.subSurvey;
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
  twDate: string
): Promise<LineupData> => {
  const response = await fetch(`/api/event?house=${house}&date=${twDate}`);
  const result = await response.json();
  return result;
};

export interface PlanTemplate {
  _id?: string;
  templateName: string;
  house: string;
  layers: Plan[];
}

export interface PlanPublic {
  _id?: string;
  publicName: string;
  house: string;
  layers: Plan[];
}

export const getPublicPlans = async (
  house: string,
  planName: string
): Promise<PlanPublic> => {
  const response = await fetch(
    `/api/plan-public?house=${house}&planName=${planName}`
  );
  const result = await response.json();
  return result.publicPlan;
};

export const getMapTemplates = async (
  house: string
): Promise<PlanTemplate[] | undefined> => {
  const response = await fetch(`/api/map-template?house=${house}`);
  const result = await response.json();
  return result.templates;
};
export interface Template {
  _id?: string;
  house: string;
  templateName: string;
  commander?: string;
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
  commander?: string;
  sheet: SheetTypes[];
  change_nick: boolean;
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
  otherActivities?: { date: string; type: string }[];
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

export interface UsersStatsSorted {
  nick: string;
  id: string;
  house: string[];
  attendance: { season: string; dates: string[] }[];
  otherActivities?: { date: string; type: string }[];
}

export const getHouseSortedStats = async (
  house: string
): Promise<UsersStatsSorted[]> => {
  const response = await fetch(`/api/userStats/sorted?house=${house}`);
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
  values: { guild_id: string; tw_discord: string }
): Promise<DiscordProps> => {
  const response = await fetch(
    `/api/discord-bot/discord-data?guild_id=${values.guild_id}&member_id=${member_id}&tw_server=${values.tw_discord}`
  );
  const result = await response.json();
  return result;
};

export interface DiscordDataByName {
  roles: { id: string; label: string }[];
  channels: { id: string; label: string }[];
  default_channel: string;
  default_role_id: string;
}
export const getDiscordDataByName = async (
  name: string
): Promise<DiscordDataByName> => {
  const response = await fetch(
    `/api/discord-bot/discord-data-by-name?name=${name}`
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

export interface HouseAssets {
  name: string;
  premium: boolean;
  sharedList: boolean;
  signupBot: string;
  messages?: boolean;
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
  bot_type: string;
  signUps: SignUp[];
  active: boolean;
}

// Function to get all active events from house
export const getBotEvents = async (house: string): Promise<BotEvent[]> => {
  const response = await fetch(`/api/event?house=${house}`);
  const result = await response.json();
  return result;
};

// Function to get one event by id
export const getBotEvent = async (id: string): Promise<BotEvent> => {
  const response = await fetch(`/api/event?eventId=${id}`);
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

export interface UnitAsset {
  era: string;
  icon: string;
  id: number;
  leadership: number;
  description: string;
  name: string;
  src: string;
  value: number;
  types: string[];
}

export interface UnitAssetsGroup {
  goldenEra: UnitAsset[];
  heroicEra: UnitAsset[];
  blueEra: UnitAsset[];
  greenEra: UnitAsset[];
  greyEra: UnitAsset[];
  otherEra: UnitAsset[];
}

export const getUnitsAssets = async (): Promise<UnitAssetsGroup> => {
  const response = await fetch(`/api/assets/units`);
  const result = await response.json();
  return result;
};

export const getUnitAssets = async (name: string): Promise<UnitAsset> => {
  const response = await fetch(`/api/assets/units?name=${name}`);
  const result = await response.json();
  return result.unitAsset;
};

export interface UnitData {
  _id?: string;
  author: string;
  authorNick?: string;
  authorAvatar?: string;
  title: string;
  date: string;
  unit: string;
  ytlink: string;
  description: string;
  tree: { structure: Map<number, number>; maxlvl: number };
  doctrines: { id: number; name: string; img: string; stats: string }[];
}

export const getUnitPost = async (id: string): Promise<UnitData> => {
  const response = await fetch(`/api/units/post?id=${id}`);
  const result = await response.json();
  return result;
};

export const getAllUnitPosts = async (unit: string): Promise<UnitData[]> => {
  const response = await fetch(`/api/units/post?unit=${unit}`);
  const result = await response.json();
  return result;
};

export const getAllUnitsPosts = async (): Promise<UnitData[]> => {
  const response = await fetch(`/api/units/post`);
  const result = await response.json();
  return result;
};

export interface UserUnitPost {
  author: {
    img: string;
    nick: string;
  };
  posts: UnitData[];
}

export const getUserUnitsPosts = async (
  author: string
): Promise<UserUnitPost> => {
  const response = await fetch(`/api/units/post?author=${author}`);
  const result = await response.json();
  return result;
};

export interface Rate {
  unit: string;
  votes: {
    id: string;
    rate: number;
  }[];
}

export const getUnitRate = async (unit: string): Promise<Rate> => {
  const response = await fetch(`/api/units/rate?unit=${unit}`);
  const result = await response.json();
  return result;
};

export interface UserServers {
  status: string;
  servers: Servers[];
}
export type Servers = {
  id: string;
  name: string;
  icon: string;
};
export const getUserServers = async (userId: string): Promise<UserServers> => {
  const response = await fetch(`/api/discord-bot/user-servers?id=${userId}`);
  const result = await response.json();
  return result;
};

export interface Badge {
  house: string;
  premium: boolean;
  surveys: number;
  history: number;
  conqBot: number;
  lineups: number;
  card?: HouseDetails;
  quality: number;
}

export const getHouseBadges = async (house: string): Promise<Badge> => {
  const response = await fetch(`/api/house/badges?house=${house}`);
  const result = await response.json();
  return result;
};
export const getAllHousesBadges = async (): Promise<Badge[]> => {
  const response = await fetch(`/api/house/badges`);
  const result = await response.json();
  return result;
};

type Materials = {
  name: string;
  amount: number;
};
export interface ArtilleryAsset {
  name: string;
  src: string;
  id: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  materials: Materials[];
}

export const getArtilleryAssets = async (): Promise<ArtilleryAsset[]> => {
  const response = await fetch(`/api/assets/artillery`);
  const result = await response.json();
  return result.artilleriesAsset;
};

export const getArtilleryAsset = async (
  name: string
): Promise<ArtilleryAsset> => {
  const response = await fetch(`/api/assets/artillery?name=${name}`);
  const result = await response.json();
  return result.artilleryAsset;
};
export interface KitsAssets {
  image: string;
  unit: string;
}

export const getKitsAssets = async (unit: string): Promise<KitsAssets[]> => {
  const response = await fetch(`/api/assets/kits?unit=${unit}`);
  const result = await response.json();
  return result.artilleryAsset;
};

export interface WeaponAsset {
  id: number;
  name: string;
  src: string;
}
export const getWeaponsAssets = async (): Promise<WeaponAsset[]> => {
  const response = await fetch(`/api/assets/weapons`);
  const result = await response.json();
  return result.weapons;
};

export interface DoctrineType {
  name: string;
  img: string;
  forUnit: string[];
  dedicated: "all" | "group" | "unit";
  stats: string;
  rarity: "common" | "uncommon" | "rare" | "epic";
}

export const getDoctrineAssets = async (): Promise<DoctrineType[]> => {
  const response = await fetch(`/api/assets/doctrines`);
  const result = await response.json();
  return result;
};

export const getDoctrineByName = async (
  name: string
): Promise<DoctrineType | null> => {
  const response = await fetch(`/api/assets/doctrines?doctrine=${name}`);
  const result = await response.json();
  return result;
};

export const getUnitDoctrines = async (
  unit: string
): Promise<DoctrineType[]> => {
  const response = await fetch(`/api/assets/doctrines?unit=${unit}`);
  const result = await response.json();
  return result;
};

export interface PageMD {
  page: string;
  body: string;
}
export const getPageMD = async (
  page: "tos" | "policy" | "docs" | "bot"
): Promise<PageMD> => {
  const response = await fetch(`/api/pagemd?page=${page}`);
  const result = await response.json();
  return result;
};

export interface TierUnits {
  id: string;
  name: string;
  image: string;
  rating: number;
  era: "golden" | "heroic" | "blue" | "green" | "grey";
}

export const getTierUnits = async (id: string): Promise<TierUnits[]> => {
  const response = await fetch(`/api/user/tierList?userId=${id}`);
  const result = await response.json();
  return result;
};

export const getCommunityTierList = async (): Promise<TierUnits[]> => {
  const response = await fetch(`/api/units/tierList`);
  const result = await response.json();
  return result;
};

interface MostUsedUnits {
  id: string;
  name: string;
  image: string;
  rating: number;
}

export const getMostUsedUnits = async (): Promise<MostUsedUnits[]> => {
  const response = await fetch(`/api/units/most-used-units`);
  const result = await response.json();
  return result;
};

export interface MapAsset {
  name: string;
  cities: string[];
  types: string[];
  type: string;
}

export const getMapsAssets = async (): Promise<MapAsset[]> => {
  const response = await fetch(`/api/assets/maps`);
  const result = await response.json();
  return result.mapsAssets;
};

export const getMapAssets = async (name: string): Promise<MapAsset> => {
  const response = await fetch(`/api/assets/maps?map=${name}`);
  const result = await response.json();
  return result.mapAssets;
};

interface OtherIconAsset {
  name: string;
}
export const getOtherIconsAssets = async (): Promise<OtherIconAsset[]> => {
  const response = await fetch(`/api/assets/other-icons`);
  const result = await response.json();

  return result.otherIcons;
};
