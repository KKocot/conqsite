"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { UnitData } from "@/lib/get-data";
import {
  commonDoctrines,
  epicDoctrines,
  rareDoctrines,
  uncommonDoctrines,
} from "@/assets/doctrines";
import DoctrineSlot from "./slot";
import Doctrine from "./item";
import { Filter } from "lucide-react";
import CheckboxItem from "./checkbox";

const DoctrinedBuilder = ({
  setValue,
  doctrineSlot: initialDoctrineSlot,
  unitName,
}: {
  setValue: UseFormSetValue<UnitData>;
  doctrineSlot: { id: number; name: string; img: string }[];
  unitName: string;
}) => {
  const [doctrineSlot, setDoctrineSlot] = useState(initialDoctrineSlot);
  const [rarityFilter, setRarityFilter] = useState({
    epic: true,
    rare: true,
    uncommon: true,
    common: true,
  });
  interface DroppedItem {
    name: string;
    img: string;
  }
  useEffect(() => {
    setValue("doctrines", doctrineSlot);
  }, [doctrineSlot, setValue]);

  const handleDrop = (id: number, item: DroppedItem) => {
    setDoctrineSlot((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id ? { ...slot, name: item.name, img: item.img } : slot
      )
    );
  };
  const sortedDoctrines = useMemo(() => {
    const epic = rarityFilter?.epic
      ? epicDoctrines.filter(
          (e) => e.dedicated === "all" || e.forUnit.includes(unitName)
        )
      : [];
    const rare = rarityFilter?.rare
      ? rareDoctrines.filter(
          (e) => e.dedicated === "all" || e.forUnit.includes(unitName)
        )
      : [];
    const uncommon = rarityFilter?.uncommon
      ? uncommonDoctrines.filter(
          (e) => e.dedicated === "all" || e.forUnit.includes(unitName)
        )
      : [];
    const common = rarityFilter?.common
      ? commonDoctrines.filter(
          (e) => e.dedicated === "all" || e.forUnit.includes(unitName)
        )
      : [];
    return [...epic, ...rare, ...uncommon, ...common];
  }, [rarityFilter, unitName]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="py-10 h-full flex flex-col gap-12">
        <div className="flex bg-accent text-background rounded-3xl items-center">
          <Filter className="ml-4" />
          <div className="flex justify-evenly w-full">
            <CheckboxItem
              checked={rarityFilter?.epic}
              onCheckedChange={() =>
                setRarityFilter((prev) => ({
                  ...prev,
                  epic: !prev.epic,
                }))
              }
              id="epic"
            />
            <CheckboxItem
              checked={rarityFilter?.rare}
              onCheckedChange={() =>
                setRarityFilter((prev) => ({
                  ...prev,
                  rare: !prev.rare,
                }))
              }
              id="rare"
            />
            <CheckboxItem
              checked={rarityFilter?.uncommon}
              onCheckedChange={() =>
                setRarityFilter((prev) => ({
                  ...prev,
                  uncommon: !prev.uncommon,
                }))
              }
              id="uncommon"
            />
            <CheckboxItem
              checked={rarityFilter?.common}
              onCheckedChange={() =>
                setRarityFilter((prev) => ({
                  ...prev,
                  common: !prev.common,
                }))
              }
              id="common"
            />
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          {sortedDoctrines.map((doctrine) => (
            <Doctrine key={doctrine.name} doctrine={doctrine} />
          ))}
        </div>

        <div className="flex justify-around">
          {doctrineSlot.map((slot) => (
            <DoctrineSlot key={slot.id} slot={slot} onDrop={handleDrop} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DoctrinedBuilder;
