"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UnitAsset } from "@/lib/get-data";
import { Unit } from "@/lib/type";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
interface PageProps {
  unitsAssets: {
    goldenEra: UnitAsset[];
    heroicEra: UnitAsset[];
    blueEra: UnitAsset[];
    greenEra: UnitAsset[];
    greyEra: UnitAsset[];
  };
}
const Content = ({
  unitsAssets: { goldenEra, heroicEra, blueEra, greenEra, greyEra },
}: PageProps) => {
  const [query, setQuery] = useState("");
  const units = useMemo(() => {
    const filteredUnits = [
      goldenEra,
      heroicEra,
      blueEra,
      greenEra,
      greyEra,
    ].map((unitList) =>
      unitList
        .filter((unit) => unit.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    return filteredUnits;
  }, [query]);

  return (
    <div className="flex flex-col gap-6 container my-12">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      {units.map((unit, index) => (
        <List key={index} units={unit} />
      ))}
    </div>
  );
};
export default Content;

const List = ({ units }: { units: Unit[] }) => {
  const t = useTranslations("Units");
  if (!units || units.length === 0) {
    return null;
  }
  let era;
  switch (units[0]?.era ?? "") {
    case "golden":
      era = t("golden_era");
      break;
    case "heroic":
      era = t("heroic_era");
      break;
    case "blue":
      era = t("silver_era");
      break;
    case "green":
      era = t("knight_era");
      break;
    case "grey":
      era = t("feudal_and_rustical_era");
      break;
    default:
      era = "";
  }
  return (
    <Card>
      <CardHeader
        className={clsx({
          "bg-gradient-to-l from-yellow-300 to-yellow-800":
            units[0].era === "golden",
          "bg-gradient-to-l from-violet-300 to-violet-800":
            units[0].era === "heroic",
          "bg-gradient-to-l from-green-300 to-green-800":
            units[0].era === "green",
          "bg-gradient-to-l from-blue-300 to-blue-800": units[0].era === "blue",
          "bg-gradient-to-l from-gray-300 to-gray-800": units[0].era === "grey",
        })}
      >
        <CardTitle>{era}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {units.map((unit) => (
          <div key={unit.id}>
            <Link
              href={`/unit/${unit.era}/${unit.name
                .toLowerCase()
                .replaceAll(" ", "_")}`}
              className="flex items-center gap-2 p-2 hover:bg-background"
            >
              <Image src={unit.icon} alt={unit.name} width={48} height={48} />
              <h1>{unit.name}</h1>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
