"use client";

import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { Plan, ToolsConfig } from "./lib/types";
import { stageSize } from "./lib/assets";
import { Dispatch, SetStateAction, useRef } from "react";

const MapEditor = ({
  plan,
  currentTool,
  onPlanChange,
}: {
  plan: Plan;
  currentTool: ToolsConfig;
  onPlanChange: Dispatch<SetStateAction<Plan>>;
}) => {
  const [backgroundImage] = useImage(`/maps/${plan.map}.jpg`);
  const stageRef = useRef<Konva.Stage>(null);
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;
    switch (currentTool.tool) {
      case "select":
        // Handle select tool logic
        break;
      case "pen":
        // Handle pen tool logic
        break;
      case "line":
        // Handle line tool logic
        break;
      case "arrow":
        // Handle arrow tool logic
        break;
      case "circle":
        // Handle circle tool logic
        break;
      case "unitIcon":
        // Handle unit icon tool logic
        break;
      case "artilleryIcon":
        // Handle artillery icon tool logic
        break;
      case "tooltip":
        // Handle tooltip tool logic
        break;
      case "delete":
        // Handle delete tool logic
        break;
      default:
        console.warn("Unknown tool selected:", currentTool.tool);
        break;
    }
  };
  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {};
  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {};
  return (
    <div className="relative w-[750px] h-[750px]">
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          <Image
            x={0}
            y={0}
            image={backgroundImage}
            width={stageSize.width}
            height={stageSize.height}
            cornerRadius={20}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default MapEditor;
