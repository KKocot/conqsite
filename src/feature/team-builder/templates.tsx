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
import { Filter, NotepadTextDashed } from "lucide-react";
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

const Templates = () => {
  const t = useTranslations("BuildTeam");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <NotepadTextDashed className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Templates</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Templates;
