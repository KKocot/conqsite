"use client";

import { useDrag, useDrop, DndProvider } from "react-dnd";
import Image from "next/image";
import clsx from "clsx";

const ItemTypes = {
  DOCTRINE: "doctrine",
};

interface Slot {
  id: number;
  name: string;
  img: string;
  stats: string;
}

interface DoctrineSlotProps {
  slot: Slot;
  onDrop: (
    id: number,
    item: { name: string; img: string; stats: string }
  ) => void;
}

const DoctrineSlot = ({ slot, onDrop }: DoctrineSlotProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DOCTRINE,
    drop: (item: { name: string; img: string; stats: string }) =>
      onDrop(slot.id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      // @ts-ignore
      ref={drop}
      className={clsx(
        "w-24 h-24 bg-accent rounded-full flex items-center cursor-not-allowed",
        {
          "bg-opacity-50": isOver,
          "bg-opacity-100": !isOver,
        }
      )}
      onClick={() => onDrop(slot.id, { name: "", img: "", stats: "" })}
    >
      {slot.name && (
        <Image
          src={slot.img}
          alt={slot.name}
          width={140}
          height={140}
          title={slot.name}
        />
      )}
    </div>
  );
};

export default DoctrineSlot;
