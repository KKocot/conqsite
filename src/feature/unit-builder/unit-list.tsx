"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import clsx from "clsx";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Unit {
  era: string;
  icon: string;
  id: number;
  leadership: number;
  name: string;
  src: string;
  value: number;
  matchingUnit?: { id: number; value: string; reduceCost?: boolean };
}

const List = ({ units, value }: { units: Unit[]; value: string }) => {
  const t = useTranslations("MyProfile");
  return (
    <TableCell>
      <div className="flex flex-wrap gap-3 justify-center">
        {units.map((unit) =>
          unit.matchingUnit?.value === value ? (
            <span key={unit.id} className="w-fit">
              {unit.value >= 9 ? (
                <div className="group relative w-fit" title={t("meta")}>
                  <div className="absolute cursor-help bottom-auto left-2 md:left-5 right-auto md:top-2 z-50 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 scale-x-100 whitespace-nowrap rounded-full bg-red-600 px-1.5 py-1 text-center text-xs font-bold leading-none text-white">
                    M
                  </div>
                </div>
              ) : null}
              {unit.matchingUnit.reduceCost ? (
                <div
                  className="group relative w-fit"
                  title="Leadership Doctrine"
                >
                  <div className="absolute cursor-help bottom-auto left-4 md:left-3 right-auto md:top-2 z-50 -translate-y-1/2 -translate-x-5 rounded-full p-1 leading-none text-background bg-accent">
                    <ShieldCheck className="md:w-4 md:h-4 h-3 w-3" />
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
