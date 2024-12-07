export interface ItemProps {
  date: string;
  lineup_1: string[];
  lineup_2: string[];
  lineup_3: string[];
  lineup_4: string[];
  lineup_5: string[];
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
  pref?: string;
  type?: string[];
  description?: string;
  season?: { number: number; name: string };
  formation?: { name: string; img: string; description: string }[];
  skills?: { name: string; description: string; image: string }[];
  dedicatedDoctrins?: { name: string; img: string }[];
  kits?: { name: string; img: string };
}
export interface SheetTypes {
  username: string;
  unit1: string;
  unit2: string;
  unit3: string;
  weapon: string;
  description: string;
  color: string;
  artillery: ArtilleryProps[];
  _id?: string;
}

export interface WeaponsTypes {
  id: number;
  name: string;
  src: string;
}

export interface ArtilleryProps {
  check: boolean;
  id: number;
}
