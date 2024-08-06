import { ChevronDown, SlidersHorizontal } from "lucide-react";
import CheckboxItem from "./sheet-form-filter";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslations } from "next-intl";
import { Dispatch, FC } from "react";

type FilterUnits = {
  meta_units_only: boolean;
  golden_checked: boolean;
  heroic_checked: boolean;
  silver_checked: boolean;
  chivalric_checked: boolean;
  rustic_checked: boolean;
  other_checked: boolean;
};

interface ChildComponentProps {
  filters: FilterUnits;
  setFilter: Dispatch<React.SetStateAction<FilterUnits>>;
}

const UnitsFilter: FC<ChildComponentProps> = ({ filters, setFilter }) => {
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
      <PopoverContent className="gap-4 flex flex-col">
        <CheckboxItem
          checked={filters.meta_units_only}
          label={t("meta_units_only")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              meta_units_only: !prev.meta_units_only,
            }))
          }
        />
        <CheckboxItem
          checked={filters.golden_checked}
          label={t("golden_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              golden_checked: !prev.golden_checked,
            }))
          }
        />
        <CheckboxItem
          checked={filters.heroic_checked}
          label={t("heroic_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              heroic_checked: !prev.heroic_checked,
            }))
          }
        />
        <CheckboxItem
          checked={filters.silver_checked}
          label={t("silver_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              silver_checked: !prev.silver_checked,
            }))
          }
        />
        <CheckboxItem
          checked={filters.chivalric_checked}
          label={t("knight_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              chivalric_checked: !prev.chivalric_checked,
            }))
          }
        />
        <CheckboxItem
          checked={filters.rustic_checked}
          label={t("feudal__and_rustical_era")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              rustic_checked: !prev.rustic_checked,
            }))
          }
        />
        <CheckboxItem
          checked={filters.other_checked}
          label={t("general")}
          onChange={() =>
            setFilter((prev) => ({
              ...prev,
              other_checked: !prev.other_checked,
            }))
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default UnitsFilter;
