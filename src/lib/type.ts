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
  name: string;
  src: string;
  value: number;
  pref?: string;
  reduceCost?: boolean;
  types: string[];
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
