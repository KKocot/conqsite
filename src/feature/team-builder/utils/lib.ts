import {
  ArtilleryAsset,
  DiscordDataByName,
  HouseAssets,
  Survey,
  UnitAssetsGroup,
  WeaponAsset,
} from "@/lib/get-data";

export interface ContentProps {
  surveysData: Survey[];
  assets?: HouseAssets;
  publicLineups: {
    dates?: string[];
    loading: boolean;
    discordData: DiscordDataByName;
  };
  unitsAssets: UnitAssetsGroup;
  artillery: ArtilleryAsset[];
  weapons: WeaponAsset[];
}

export interface FiltersProps {
  rustic_checked: boolean;
  chivalric_checked: boolean;
  silver_checked: boolean;
  heroic_checked: boolean;
  golden_checked: boolean;
  other_checked: boolean;
  meta_units_only: boolean;
}

export const DEFAULT_FILTERS: FiltersProps = {
  rustic_checked: true,
  chivalric_checked: true,
  silver_checked: true,
  heroic_checked: true,
  golden_checked: true,
  other_checked: true,
  meta_units_only: true,
};
