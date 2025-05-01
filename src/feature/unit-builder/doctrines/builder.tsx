"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { DoctrineType, UnitData } from "@/lib/get-data";
import DoctrineSlot from "./slot";
import DoctrineItem from "./item";
import { Filter } from "lucide-react";
import CheckboxItem from "./checkbox";

const DoctrinedBuilder = ({
  setValue,
  doctrineSlot: initialDoctrineSlot,
  unitName,
  doctrines,
}: {
  setValue: UseFormSetValue<UnitData>;
  doctrineSlot: { id: number; name: string; img: string; stats: string }[];
  unitName: string;
  doctrines: DoctrineType[];
}) => {
  const [doctrineSlot, setDoctrineSlot] = useState(initialDoctrineSlot);
  const [rarityFilter, setRarityFilter] = useState({
    epic: true,
    rare: false,
    uncommon: false,
    common: false,
  });
  interface DroppedItem {
    name: string;
    img: string;
    stats: string;
  }
  useEffect(() => {
    setValue("doctrines", doctrineSlot);
  }, [doctrineSlot, setValue]);

  const handleDrop = (id: number, item: DroppedItem) => {
    setDoctrineSlot((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id
          ? { ...slot, name: item.name, img: item.img, stats: item.stats }
          : slot
      )
    );
  };
  const sortedDoctrines = useMemo(() => {
    const epic = rarityFilter?.epic
      ? doctrines.filter(
          (e) =>
            e.rarity === "epic" &&
            (e.dedicated === "all" ||
              e.dedicated === "group" ||
              e.forUnit.includes(unitName))
        )
      : [];
    const rare = rarityFilter?.rare
      ? doctrines.filter(
          (e) =>
            e.rarity === "rare" &&
            (e.dedicated === "all" ||
              e.dedicated === "group" ||
              e.forUnit.includes(unitName))
        )
      : [];
    const uncommon = rarityFilter?.uncommon
      ? doctrines.filter(
          (e) =>
            e.rarity === "uncommon" &&
            (e.dedicated === "all" ||
              e.dedicated === "group" ||
              e.forUnit.includes(unitName))
        )
      : [];
    const common = rarityFilter?.common
      ? doctrines.filter(
          (e) =>
            e.rarity === "common" &&
            (e.dedicated === "all" ||
              e.dedicated === "group" ||
              e.forUnit.includes(unitName))
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
            <DoctrineItem key={doctrine.name} doctrine={doctrine} />
          ))}
        </div>
        <div>
          <div className="flex justify-around mt-2">
            {doctrineSlot.map((slot) => (
              <div key={slot.id} className="w-32 text-center text-sm font-bold">
                {slot.name}
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-2">
            {doctrineSlot.map((slot) => (
              <DoctrineSlot key={slot.id} slot={slot} onDrop={handleDrop} />
            ))}
          </div>
          <div className="flex justify-around mt-2">
            {doctrineSlot.map((slot) => (
              <div key={slot.id} className="w-32 text-xs">
                {slot.stats}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DoctrinedBuilder;
