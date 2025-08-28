import { TierUnits } from "@/lib/get-data";

export const listTab = [
  {
    value: "fillList",
    label: "Full List",
  },
  {
    value: "CommunityTierList",
    label: "Community Tier List",
  },
  {
    value: "MostUsedUnits",
    label: "Most Used Units",
  },
];
export type CardType =
  | "fillList"
  | "CommunityTierList"
  | "MostUsedUnits"
  | null;

export const unitTypes = [
  "All",
  "Melee",
  "Lancer",
  "Melee Infantry",
  "Buckler Shield",
  "Tower Shield",
  "Polearm",
  "Javelineers",
  "Melee Infantry Javelineers",
  "Range Infantry",
  "Range Infantry Archer",
  "Range Infantry Crossbow",
  "Range Infantry Arqebusier",
  "Archer",
  "Crossbow",
  "Arqebusier",
  "Cavalry",
  "Musketeer",
  "Cavalry Melee",
  "Cavalry Lancer",
  "Cavalry Javelineers",
  "Cavalry Archer",
  "Cavalry Musketeer",
  "Cavalry Special",
  "Special",
];

// Type for the tier list items
export type TierListItem = {
  tier: {
    value: number;
    color: string;
    label: string;
  };
  items: TierUnits[];
};

// Define all 11 tiers (0-10)
export const tiers = [
  { value: 10, color: "bg-red-600", label: "10" },
  { value: 9, color: "bg-red-500", label: "9" },
  { value: 8, color: "bg-orange-500", label: "8" },
  { value: 7, color: "bg-orange-400", label: "7" },
  { value: 6, color: "bg-yellow-500", label: "6" },
  { value: 5, color: "bg-yellow-400", label: "5" },
  { value: 4, color: "bg-green-500", label: "4" },
  { value: 3, color: "bg-green-400", label: "3" },
  { value: 2, color: "bg-blue-500", label: "2" },
  { value: 1, color: "bg-blue-400", label: "1" },
];

export interface MostUsedUnitsType {
  id: string;
  name: string;
  image: string;
  rating: number;
}
