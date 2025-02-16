"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Unit {
  era: string;
  icon: string;
  id: number;
  leadership: number;
  masteryPoints: boolean;
  name: string;
  src: string;
  value: number;
  matchingGolden?: { id: number; value: string };
}

const List = ({ units, value }: { units: Unit[]; value: string }) => {
  const t = useTranslations("MyProfile");
  return (
    <TableCell>
      <div className="flex flex-wrap gap-2 justify-center">
        {units.map((unit) =>
          unit.matchingGolden?.value === value ? (
            <span key={unit.id} className="w-fit">
              {unit.value >= 9 ? (
                <div className="group relative w-fit" title={t("meta")}>
                  <div className="absolute cursor-help bottom-auto left-2 md:left-5 right-auto md:top-2 z-50 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 scale-x-100 whitespace-nowrap rounded-full bg-red-600 px-1.5 py-1 text-center text-xs font-bold leading-none text-white">
                    M
                  </div>
                </div>
              ) : null}
              <Link
                href={`/unit/${unit?.era}/${unit?.name
                  .replaceAll(" ", "_")
                  .toLocaleLowerCase()}`}
                target="_blank"
              >
                <Avatar
                  className={clsx(
                    "h-8 w-8 md:h-12 md:w-12 border-solid border-2 border-transparent shadow-md rounded-none",
                    {
                      "border-red-600": unit.value >= 9,
                    }
                  )}
                  title={unit.name}
                >
                  <AvatarImage alt={unit.name} src={unit.icon} />
                  <AvatarFallback className="rounded-none">U</AvatarFallback>
                </Avatar>
              </Link>
            </span>
          ) : null
        )}
      </div>
    </TableCell>
  );
};

export default List;
