export interface ItemProps {
  date: string;
  lineup_1: string[];
  lineup_2: string[];
  lineup_3: string[];
  lineup_4: string[];
  lineup_5: string[];
}

export interface SurveyProps {
  discordNick: string;
  inGameNick: string;
  discordId: string;
  characterLevel: string;
  artyAmount: "none" | "some" | "average" | "aLot";

  weapons: [
    {
      value: Boolean;
      leadership: number;
    }
  ];
  units: {
    low: [
      {
        id: number;
        value: string;
      }
    ];
    heroic: [
      {
        id: number;
        value: string;
      }
    ];
    golden: [
      {
        id: number;
        value: string;
      }
    ];
  };
}

export interface Unit {
  era: string;
  icon: string;
  id: number;
  leadership: number;
  masteryPoints: boolean;
  name: string;
  src: string;
  value: number;
}
export interface SheetTypes {
  username: string;
  unit1: string;
  unit2: string;
  unit3: string;
  weapon: string;
  description: string;
  color: BorderColorProps;
  artillery: ArtilleryProps[];
}

export interface WeaponsTypes {
  id: number;
  name: string;
  src: string;
}

export type BorderColorProps =
  | "red"
  | "blue"
  | "slate"
  | "cyan"
  | "neutral"
  | "stone"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "sky"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export interface ArtilleryProps {
  check: boolean;
  id: number;
}
