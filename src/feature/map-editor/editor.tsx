"use client";

import {
  Stage,
  Layer,
  Image,
  Line,
  Arrow,
  Circle,
  Tag,
  Text,
  Label,
  Group,
} from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { Plan, ToolsConfig } from "./lib/types";
import { stageSize } from "./lib/assets";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { nanoid } from "nanoid";
import UnitIconImage from "./unit-icon-image";
import TooltipKanva from "./tooltip-kanva";

const MapEditor = ({
  plan,
  currentTool,
  onPlanChange,
}: {
  plan: Plan;
  currentTool: ToolsConfig;
  onPlanChange: Dispatch<SetStateAction<Plan>>;
}) => {
  const [backgroundImage] = useImage(
    `/api/images/maps/${plan.map.toLowerCase().replaceAll(/[ ':]/g, "-")}.png`
  );
  const stageRef = useRef<Konva.Stage>(null);
  const isDrawing = useRef(false);
  const selectedElementId = useRef<string | null>(null);
  const isDragging = useRef(false);
  const isDrawingLine = useRef(false);
  const isDrawingArrow = useRef(false);
  const isDrawingCircle = useRef(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (_e: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = stageRef.current?.getPointerPosition();
    if (!pos) return;
    switch (currentTool.tool) {
      case "select":
        // Handle select and move logic
        const clickedElement = plan.elements.find((element) => {
          // Simple hit detection - check if click is near any element
          if ("points" in element && element.points.length >= 2) {
            const minX = Math.min(
              ...element.points.filter((_, i) => i % 2 === 0)
            );
            const maxX = Math.max(
              ...element.points.filter((_, i) => i % 2 === 0)
            );
            const minY = Math.min(
              ...element.points.filter((_, i) => i % 2 === 1)
            );
            const maxY = Math.max(
              ...element.points.filter((_, i) => i % 2 === 1)
            );
            const hitBuffer = element.strokeWidth / 2;
            return (
              pos.x >= minX - hitBuffer &&
              pos.x <= maxX + hitBuffer &&
              pos.y >= minY - hitBuffer &&
              pos.y <= maxY + hitBuffer
            );
          }
          if ("x" in element && "y" in element && "radius" in element) {
            const dx = pos.x - element.x;
            const dy = pos.y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const hitBuffer = element.strokeWidth / 2;
            return distance <= element.radius + hitBuffer;
          }
          // Hit detection for unit icons and artillery icons
          if (
            "x" in element &&
            "y" in element &&
            (element.tool === "unitIcon" || element.tool === "artilleryIcon")
          ) {
            const halfSize = element.strokeWidth / 2;
            return (
              pos.x >= element.x - halfSize &&
              pos.x <= element.x + halfSize &&
              pos.y >= element.y - halfSize &&
              pos.y <= element.y + halfSize
            );
          }
          return false;
        });

        if (clickedElement) {
          selectedElementId.current = clickedElement.id;
          isDragging.current = true;
          dragStartPos.current = { x: pos.x, y: pos.y };
        } else {
          selectedElementId.current = null;
          dragStartPos.current = null;
        }
        break;
      case "pen":
        // Handle pen tool logic
        isDrawing.current = true;
        onPlanChange((prev) => ({
          ...prev,
          elements: [
            ...prev.elements,
            {
              id: nanoid(),
              tool: currentTool.tool,
              color: currentTool.toolColor,
              strokeWidth: currentTool.size,
              points: [pos.x, pos.y],
            },
          ],
        }));
        break;
      case "line":
        // Handle line tool logic
        if (!isDrawingLine.current) {
          // Start drawing line
          isDrawingLine.current = true;
          onPlanChange((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                id: nanoid(),
                tool: currentTool.tool,
                color: currentTool.toolColor,
                strokeWidth: currentTool.size,
                points: [pos.x, pos.y, pos.x, pos.y],
              },
            ],
          }));
        } else {
          // Finish drawing line
          isDrawingLine.current = false;
          onPlanChange((prev) => {
            const newElements = [...prev.elements];
            const lastElement = newElements[newElements.length - 1];
            if (lastElement.tool === "line") {
              const updatedElement = {
                ...lastElement,
                points: [
                  "points" in lastElement ? lastElement.points[0] : pos.x,
                  "points" in lastElement ? lastElement.points[1] : pos.y,
                  pos.x,
                  pos.y,
                ],
              };
              newElements[newElements.length - 1] = updatedElement;
            }

            return {
              ...prev,
              elements: newElements,
            };
          });
        }
        break;
      case "arrow":
        // Handle arrow tool logic
        if (!isDrawingArrow.current) {
          // Start drawing arrow
          isDrawingArrow.current = true;
          onPlanChange((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                id: nanoid(),
                tool: currentTool.tool,
                color: currentTool.toolColor,
                strokeWidth: currentTool.size,
                points: [pos.x, pos.y, pos.x, pos.y],
              },
            ],
          }));
        } else {
          // Finish drawing arrow
          isDrawingArrow.current = false;
          onPlanChange((prev) => {
            const newElements = [...prev.elements];
            const lastElement = newElements[newElements.length - 1];

            if (lastElement.tool === "arrow") {
              const updatedElement = {
                ...lastElement,
                points: [
                  "points" in lastElement ? lastElement.points[0] : pos.x,
                  "points" in lastElement ? lastElement.points[1] : pos.y,
                  pos.x,
                  pos.y,
                ],
              };
              newElements[newElements.length - 1] = updatedElement;
            }

            return {
              ...prev,
              elements: newElements,
            };
          });
        }
        break;
      case "circle":
        // Handle circle tool logic
        if (!isDrawingCircle.current) {
          // Start drawing circle
          isDrawingCircle.current = true;
          onPlanChange((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                id: nanoid(),
                tool: currentTool.tool,
                color: currentTool.toolColor,
                strokeWidth: currentTool.size,
                x: pos.x,
                y: pos.y,
                radius: 0,
              },
            ],
          }));
        } else {
          // Finish drawing circle
          isDrawingCircle.current = false;
        }
        break;
      case "unitIcon":
        // Handle unit icon tool logic
        if (currentTool.unitIconValue) {
          onPlanChange((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                id: nanoid(),
                tool: currentTool.tool,
                color: currentTool.toolColor,
                strokeWidth: currentTool.size,
                size: currentTool.size,
                x: pos.x,
                y: pos.y,
                iconValue: currentTool.unitIconValue,
              },
            ],
          }));
        }
        break;
      case "artilleryIcon":
        // Handle unit icon tool logic
        if (currentTool.otherIconValue) {
          onPlanChange((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                id: nanoid(),
                tool: currentTool.tool,
                color: currentTool.toolColor,
                strokeWidth: currentTool.size,
                size: currentTool.size,
                x: pos.x,
                y: pos.y,
                iconValue: currentTool.otherIconValue,
              },
            ],
          }));
        }
        break;
      case "tooltip":
        // Handle tooltip tool logic
        if (currentTool.tooltipValue) {
          onPlanChange((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                id: nanoid(),
                tool: currentTool.tool,
                color: currentTool.toolColor,
                strokeWidth: currentTool.size,
                x: pos.x,
                y: pos.y,
                iconValue: currentTool.tooltipValue,
              },
            ],
          }));
        }
        break;
      case "delete":
        // Handle delete tool logic
        const elementToDelete = plan.elements.find((element) => {
          // Simple hit detection - check if click is near any element
          if ("points" in element && element.points.length >= 2) {
            const minX = Math.min(
              ...element.points.filter((_, i) => i % 2 === 0)
            );
            const maxX = Math.max(
              ...element.points.filter((_, i) => i % 2 === 0)
            );
            const minY = Math.min(
              ...element.points.filter((_, i) => i % 2 === 1)
            );
            const maxY = Math.max(
              ...element.points.filter((_, i) => i % 2 === 1)
            );
            const hitBuffer = element.strokeWidth / 2;
            return (
              pos.x >= minX - hitBuffer &&
              pos.x <= maxX + hitBuffer &&
              pos.y >= minY - hitBuffer &&
              pos.y <= maxY + hitBuffer
            );
          }
          if ("x" in element && "y" in element && "radius" in element) {
            const dx = pos.x - element.x;
            const dy = pos.y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const hitBuffer = element.strokeWidth / 2;
            return distance <= element.radius + hitBuffer;
          }
          // Hit detection for unit icons and artillery icons
          if (
            "x" in element &&
            "y" in element &&
            "size" in element &&
            (element.tool === "unitIcon" || element.tool === "artilleryIcon")
          ) {
            const halfSize = element.strokeWidth / 2;
            return (
              pos.x >= element.x - halfSize &&
              pos.x <= element.x + halfSize &&
              pos.y >= element.y - halfSize &&
              pos.y <= element.y + halfSize
            );
          }
          return false;
        });

        if (elementToDelete) {
          onPlanChange((prev) => ({
            ...prev,
            elements: prev.elements.filter(
              (element) => element.id !== elementToDelete.id
            ),
          }));
        }
        break;
      default:
        console.warn("Unknown tool selected:", currentTool.tool);
        break;
    }
  };
  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (
      isDragging.current &&
      selectedElementId.current &&
      dragStartPos.current
    ) {
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();

      if (!point) return;

      const offset = {
        x: point.x - dragStartPos.current.x,
        y: point.y - dragStartPos.current.y,
      };

      // Handle dragging selected element
      onPlanChange((prev) => {
        const newElements = prev.elements.map((element) => {
          if (element.id === selectedElementId.current) {
            if ("points" in element) {
              const newPoints = element.points.map((coord, index) => {
                return index % 2 === 0 ? coord + offset.x : coord + offset.y;
              });
              return { ...element, points: newPoints };
            }
            if ("x" in element && "y" in element) {
              return {
                ...element,
                x: element.x + offset.x,
                y: element.y + offset.y,
              };
            }
          }
          return element;
        });

        return { ...prev, elements: newElements };
      });

      // Update drag start position for next move
      dragStartPos.current = { x: point.x, y: point.y };
      return;
    }

    if (
      !isDrawing.current &&
      !isDrawingLine.current &&
      !isDrawingArrow.current &&
      !isDrawingCircle.current
    ) {
      return;
    }

    // Handle circle preview while drawing
    if (isDrawingCircle.current && plan.elements.length > 0) {
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (!point) return;

      onPlanChange((prev) => {
        const newElements = [...prev.elements];
        const lastElement = newElements[newElements.length - 1];

        if (
          lastElement.tool === "circle" &&
          "x" in lastElement &&
          "y" in lastElement
        ) {
          const dx = point.x - lastElement.x;
          const dy = point.y - lastElement.y;
          const radius = Math.sqrt(dx * dx + dy * dy);

          const updatedElement = {
            ...lastElement,
            radius: radius,
          };
          newElements[newElements.length - 1] = updatedElement;
        }

        return {
          ...prev,
          elements: newElements,
        };
      });
      return;
    }

    // Handle arrow preview while drawing
    if (isDrawingArrow.current && plan.elements.length > 0) {
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (!point) return;

      onPlanChange((prev) => {
        const newElements = [...prev.elements];
        const lastElement = newElements[newElements.length - 1];

        if (lastElement.tool === "arrow" && "points" in lastElement) {
          const updatedElement = {
            ...lastElement,
            points: [
              lastElement.points[0],
              lastElement.points[1],
              point.x,
              point.y,
            ],
          };
          newElements[newElements.length - 1] = updatedElement;
        }

        return {
          ...prev,
          elements: newElements,
        };
      });
      return;
    }

    // Handle line preview while drawing
    if (isDrawingLine.current && plan.elements.length > 0) {
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (!point) return;

      onPlanChange((prev) => {
        const newElements = [...prev.elements];
        const lastElement = newElements[newElements.length - 1];

        if (lastElement.tool === "line" && "points" in lastElement) {
          const updatedElement = {
            ...lastElement,
            points: [
              lastElement.points[0],
              lastElement.points[1],
              point.x,
              point.y,
            ],
          };
          newElements[newElements.length - 1] = updatedElement;
        }

        return {
          ...prev,
          elements: newElements,
        };
      });
      return;
    }

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();

    if (!point || plan.elements.length === 0) {
      return;
    }

    onPlanChange((prev) => {
      const newElements = [...prev.elements];
      const lastElement = newElements[newElements.length - 1];

      if (lastElement.tool === "pen" && "points" in lastElement) {
        const updatedElement = {
          ...lastElement,
          points: [...lastElement.points, point.x, point.y],
        };
        newElements[newElements.length - 1] = updatedElement;
      }

      return {
        ...prev,
        elements: newElements,
      };
    });
  };
  const handleMouseUp = () => {
    isDrawing.current = false;
    isDragging.current = false;
    dragStartPos.current = null;
  };

  return (
    <div className="relative w-[800px] h-[800px]">
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
        <Layer>
          {plan.elements.map((element) => {
            if (
              (element.tool === "pen" ||
                element.tool === "eraser" ||
                element.tool === "line") &&
              "points" in element
            ) {
              return (
                <Line
                  key={element.id}
                  points={element.points}
                  stroke={element.color}
                  strokeWidth={element.strokeWidth}
                  tension={element.tool === "line" ? 0 : 0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    element.tool === "eraser"
                      ? "destination-out"
                      : "source-over"
                  }
                />
              );
            }
            if (element.tool === "arrow" && "points" in element) {
              return (
                <Arrow
                  key={element.id}
                  points={element.points}
                  stroke={element.color}
                  fill={element.color}
                  strokeWidth={element.strokeWidth}
                  lineCap="round"
                  lineJoin="round"
                  pointerLength={10}
                  pointerWidth={8}
                />
              );
            }
            if (
              element.tool === "circle" &&
              "x" in element &&
              "y" in element &&
              "radius" in element
            ) {
              return (
                <Circle
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  radius={element.radius}
                  stroke={element.color}
                  strokeWidth={element.strokeWidth}
                  fill="transparent"
                />
              );
            }
            if (
              (element.tool === "unitIcon" ||
                element.tool === "artilleryIcon") &&
              "iconValue" in element
            ) {
              return <UnitIconImage key={element.id} element={element} />;
            }
            if (element.tool === "tooltip" && "iconValue" in element) {
              return <TooltipKanva element={element} />;
            }

            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default MapEditor;
