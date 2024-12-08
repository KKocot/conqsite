"use client";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Image from "next/image";
import { useState } from "react";
import { doctrines } from "@/assets/doctrines";

const ItemTypes = {
  DOCTRINE: "doctrine",
};

interface DoctrineProps {
  doctrine: {
    name: string;
    img: string;
  };
}

const Doctrine = ({ doctrine }: DoctrineProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DOCTRINE,
    item: { name: doctrine.name, img: doctrine.img },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    // @ts-ignore
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Image
        src={doctrine.img}
        alt={doctrine.name}
        width={48}
        height={48}
        title={doctrine.name}
      />
    </div>
  );
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
    // @ts-ignore
    // <div ref={drop} className="border-2 border-primary w-12 h-12">
    <div ref={drop} className="border-2 border-primary w-24 h-24 text-center">
      {slot.name && (
        <p className="">{slot.name}</p>
        // <Image
        //   src={slot.img}
        //   alt={slot.name}
        //   width={48}
        //   height={48}
        //   title={slot.name}
        // />
      )}
    </div>
  );
};

const DoctrinedBuilder = () => {
  const [doctrineSlot, setDoctrineSlot] = useState([
    { id: 1, name: "", img: "" },
    { id: 2, name: "", img: "" },
    { id: 3, name: "", img: "" },
    { id: 4, name: "", img: "" },
    { id: 5, name: "", img: "" },
  ]);

  interface DroppedItem {
    name: string;
    img: string;
  }

  const handleDrop = (id: number, item: DroppedItem) => {
    setDoctrineSlot((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id ? { ...slot, name: item.name, img: item.img } : slot
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="py-10 h-full flex flex-col gap-12">
        <div className="flex gap-5 flex-wrap">
          {doctrines.map((doctrine) => (
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
