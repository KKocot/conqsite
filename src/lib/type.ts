export interface ItemProps {
  date: string;
  lineup_1: string[];
  lineup_2: string[];
  lineup_3: string[];
  lineup_4: string[];
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
}

export interface WeaponsTypes {
  id: number;
  name: string;
  src: string;
}
