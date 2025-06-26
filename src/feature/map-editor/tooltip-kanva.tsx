import { useState, useRef } from "react";
import { Tag, Text, Label, Group, Circle } from "react-konva";
import { IconElement } from "./lib/types";
import Konva from "konva";

const TooltipKanva = ({ element }: { element: IconElement }) => {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<Konva.Group>(null);

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
      <Circle radius={15} fill="white" stroke={element.color} />
      <Text
        text={element.iconValue.slice(0, 2)}
        fontSize={16}
        fontStyle="bold"
        fill={element.color}
        x={-10}
        y={-7}
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
          <Text
            text={element.iconValue}
            fontSize={14}
            fill="white"
            padding={5}
          />
        </Label>
      )}
    </Group>
  );
};

export default TooltipKanva;
