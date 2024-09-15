export interface Roles {
  _id?: string;
  discordId: string;
  house: string;
  role: string;
  discordNick: string;
}
export const getRoles = async (): Promise<Roles[]> => {
  const response = await fetch("/api/roles");
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

export const getHousesDetails = async (
  house: string
): Promise<HouseDetails> => {
  const response = await fetch(`/api/house?name=${house}`);
  const result = await response.json();
  return result;
};

export interface HouseSettings {
  house: { name: string; id: string };
  member: { name: string; id: string };
  lineup: { name: string; id: string; roleId: string }[];
  logs: { logs: string; attendance: string };
  tw: { server: string; member: string };
}

export const getHouseSettings = async (
  house: string
): Promise<HouseSettings> => {
  const response = await fetch(`/api/houseSettings?house=${house}`);
  const result = await response.json();
  return {
    ...result,
    house: { name: house, id: result.house.id },
  };
};

export interface Survey {
  _id?: string;
  discordNick: string;
  inGameNick: string;
  discordId: string;
  characterLevel: string;
  avatar?: string;
  house: string;
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
