"use client";

import { useDrag } from "react-dnd";
import Image from "next/image";

interface DoctrineData {
  name: string;
  img: string;
  forUnit: string[];
  dedicated: "all" | "group" | "unit";
  stats: string;
}
interface DoctrineProps {
  doctrine: DoctrineData;
}
const ItemTypes = {
  DOCTRINE: "doctrine",
};

const Doctrine = ({ doctrine }: DoctrineProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DOCTRINE,
    item: { name: doctrine.name, img: doctrine.img },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      // @ts-ignore
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-grab"
    >
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

export default Doctrine;
