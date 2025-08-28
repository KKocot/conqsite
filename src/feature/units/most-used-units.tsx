"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import ImageComponent from "@/components/image-component";
import { mostUsedUnitsOptions } from "./lib/query";
import { MostUsedUnitsType } from "./lib/utils";

const MostUsedUnits = () => {
  const { data } = useSuspenseQuery(mostUsedUnitsOptions);
  const units: MostUsedUnitsType[] = data || [];
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="flex flex-col items-center justify-center"
          >
            <Link
              href={`/unit/${unit.name.replaceAll(" ", "_")}`}
              key={unit.id}
              className="p-[2px]"
            >
              <ImageComponent name={unit.name} width={90} height={90} />
            </Link>
            <span className="text-sm font-semibold">{unit.name}</span>
            <span className="text-xs">Popularity points: {unit.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MostUsedUnits;
