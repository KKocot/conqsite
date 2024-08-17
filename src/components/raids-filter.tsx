import { ChevronDown, SlidersHorizontal } from "lucide-react";
import CheckboxItem from "./sheet-form-filter";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

type Filter = {
  ko: boolean;
  kt: boolean;
  zp: boolean;
  nashin: boolean;
  wallsy: boolean;
  blackforge_1: boolean;
  blackforge_2: boolean;
};

interface RaidsFilterProps {
  userHouse: string;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const RaidsFilter: FC<RaidsFilterProps> = ({
  userHouse,
  filter,
  setFilter,
}) => {
  const t = useTranslations("BuildTeam");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="tab">
          <SlidersHorizontal className="w-5 h-5" />
          {t("lineups")}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gap-4 flex flex-col">
        {userHouse === "KingdomOfPoland" ? (
          <>
            <CheckboxItem
              checked={filter.ko}
              label="King's Order"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  ko: !prev.ko,
                }))
              }
            />
            <CheckboxItem
              checked={filter.kt}
              label="Królewska Tarcza"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  kt: !prev.kt,
                }))
              }
            />
            <CheckboxItem
              checked={filter.zp}
              label="Zielona Piechota"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  zp: !prev.zp,
                }))
              }
            />
          </>
        ) : userHouse === "Erebus" ? (
          <>
            <CheckboxItem
              checked={filter.nashin}
              label="NaShin"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  nashin: !prev.nashin,
                }))
              }
            />
            <CheckboxItem
              checked={filter.wallsy}
              label="Wallsy raid"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  wallsy: !prev.wallsy,
                }))
              }
            />
          </>
        ) : userHouse === "BlackForge" ? (
          <>
            <CheckboxItem
              checked={filter.blackforge_1}
              label="Raid 1"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  blackforge_1: !prev.blackforge_1,
                }))
              }
            />
            <CheckboxItem
              checked={filter.blackforge_2}
              label="Raid 2"
              onChange={() =>
                setFilter((prev) => ({
                  ...prev,
                  blackforge_2: !prev.blackforge_2,
                }))
              }
            />
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};
export default RaidsFilter;
