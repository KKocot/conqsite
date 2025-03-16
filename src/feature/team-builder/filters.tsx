"use client";

import CheckboxItem from "@/feature/team-builder/sheet-form-filter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

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
  setFilter: Dispatch<SetStateAction<FilterUnits>>;
}

const Filters = ({ filters, setFilter }: ChildComponentProps) => {
  const t = useTranslations("BuildTeam.filters");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background">
          <Filter className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("filters")}</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};

export default Filters;
