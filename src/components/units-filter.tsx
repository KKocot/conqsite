import { ChevronDown, SlidersHorizontal } from "lucide-react";
import CheckboxItem from "./sheet-form-filter";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslations } from "next-intl";
import { Dispatch, FC } from "react";

export type UnitsFilterData = {
  golden: boolean;
  heroic: boolean;
  blue: boolean;
  green: boolean;
  grey: boolean;
  other: boolean;
  meta: boolean;
};

interface ChildComponentProps {
  filters: UnitsFilterData;
  setFilter: Dispatch<React.SetStateAction<UnitsFilterData>>;
}

export const UnitsFilter: FC<ChildComponentProps> = ({
  filters,
  setFilter,
}) => {
  const t = useTranslations("BuildTeam");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="tab">
          <SlidersHorizontal className="w-5 h-5" />
          {t("units")}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gap-4 flex flex-col p-2">
        <CheckboxItem
          checked={filters.meta}
          label={t("meta_units_only")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              meta: !prev.meta,
            }))
          }
        />
        <CheckboxItem
          checked={filters.golden}
          label={t("golden_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              golden: !prev.golden,
            }))
          }
        />
        <CheckboxItem
          checked={filters.heroic}
          label={t("heroic_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              heroic: !prev.heroic,
            }))
          }
        />
        <CheckboxItem
          checked={filters.blue}
          label={t("silver_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              blue: !prev.blue,
            }))
          }
        />
        <CheckboxItem
          checked={filters.green}
          label={t("knight_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              green: !prev.green,
            }))
          }
        />
        <CheckboxItem
          checked={filters.grey}
          label={t("feudal__and_rustical_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              grey: !prev.grey,
            }))
          }
        />
        <CheckboxItem
          checked={filters.other}
          label={t("general")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              other: !prev.other,
            }))
          }
        />
      </PopoverContent>
    </Popover>
  );
};
