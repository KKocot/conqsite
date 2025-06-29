import { useState, useRef } from "react";
import { Tag, Text, Label, Group, Circle } from "react-konva";
import { IconElement } from "./lib/types";
import Konva from "konva";
import { PublicLineup } from "@/lib/get-data";

const getSizes = (size: number) => {
  switch (size) {
    case 1:
      return { fontSize: 8, radius: 8, x: -5, y: -3 };
    case 2:
      return { fontSize: 12, radius: 13, x: -9, y: -5 };
    case 3:
      return { fontSize: 17, radius: 19, x: -11, y: -8 };
    case 4:
      return { fontSize: 20, radius: 24, x: -13, y: -9 };
    default:
      return { fontSize: 14, radius: 15, x: -10, y: -7 };
  }
};

const TooltipKanva = ({
  element,
  lineup,
}: {
  element: IconElement;
  lineup: PublicLineup;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<Konva.Group>(null);
  const currentPlayer = lineup.sheet.find(
    (player) => player.username === element.iconValue
  );
  const labelText = currentPlayer
    ? `User: ${currentPlayer.username}
Unit 1: ${currentPlayer.unit1}
Unit 2: ${currentPlayer.unit2}
Unit 3: ${currentPlayer.unit3}
Weapon: ${currentPlayer.weapon}
Desc: ${currentPlayer.description}`
    : "No data available";
  const { fontSize, radius, x, y } = getSizes(element.strokeWidth);
  return (
    <Group
      ref={groupRef}
      key={element.id}
      x={element.x}
      y={element.y}
      onMouseEnter={() => {
        setIsHovered(true);
        groupRef.current?.moveToTop();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Circle radius={radius} fill="white" stroke={element.color} />
      <Text
        text={element.iconValue.slice(0, 2)}
        fontSize={fontSize}
        fontStyle="bold"
        fill={element.color}
        x={x}
        y={y}
      />
      {isHovered && (
        <Label x={0} y={-10}>
          <Tag
            fill="black"
            pointerDirection="down"
            pointerWidth={10}
            pointerHeight={10}
            lineJoin="round"
            cornerRadius={4}
          />
          <Text text={labelText} fontSize={14} fill="white" padding={5} />
        </Label>
      )}
    </Group>
  );
};

export default TooltipKanva;
