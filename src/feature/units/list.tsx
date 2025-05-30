import { useMemo } from "react";
import { UnitAsset } from "@/lib/get-data";
import ListItem from "./list-item";

export interface ContentProps {
  goldenEra: UnitAsset[];
  heroicEra: UnitAsset[];
  blueEra: UnitAsset[];
  greenEra: UnitAsset[];
  greyEra: UnitAsset[];
}
const List = ({
  data,
  query,
  filter,
}: {
  data: ContentProps;
  query: string;
  filter: string;
}) => {
  const { goldenEra, heroicEra, blueEra, greenEra, greyEra } = data;
  const units = useMemo(() => {
    const filteredUnits = [
      goldenEra,
      heroicEra,
      blueEra,
      greenEra,
      greyEra,
    ].map((unitList) =>
      unitList
        .filter(
          (unit) =>
            unit.name.toLowerCase().includes(query.toLowerCase()) &&
            (filter === "All" ||
              `${unit.types[0]} ${unit.types[1]}`.includes(filter))
        )

        .sort((a, b) => a.name.localeCompare(b.name))
    );
    return filteredUnits;
  }, [query, filter]);
  return units.map((unit, index) => <ListItem key={index} units={unit} />);
};

export default List;
