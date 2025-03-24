"use client";

import { useDrag, useDrop, DndProvider } from "react-dnd";
import Image from "next/image";

const ItemTypes = {
  DOCTRINE: "doctrine",
};

interface Slot {
  id: number;
  name: string;
  img: string;
}

interface DoctrineSlotProps {
  slot: Slot;
  onDrop: (id: number, item: { name: string; img: string }) => void;
}

const DoctrineSlot = ({ slot, onDrop }: DoctrineSlotProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DOCTRINE,
    drop: (item: { name: string; img: string }) => onDrop(slot.id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      // @ts-ignore
      ref={drop}
      className="w-12 h-12 bg-accent rounded-full flex items-center"
    >
      {/* <div ref={drop} className="border-2 border-primary w-24 h-24 text-center"> */}
      {slot.name && (
        <Image
          src={slot.img}
          alt={slot.name}
          width={48}
          height={48}
          title={slot.name}
        />
      )}
    </div>
  );
};

export default DoctrineSlot;
