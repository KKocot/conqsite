"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  Stage,
  Layer,
  Image,
  Line,
  Circle,
  Arrow,
  Group,
  Text,
} from "react-konva";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { nanoid } from "nanoid";
import { getMilitaryIcon } from "./tactical-icons";
import type {
  MapEditorProps,
  MapEditorRef,
  PenElement,
  LineElement,
  ArrowElement,
  CircleElement,
  IconElement,
  TextElement,
  TooltipData,
  MapData,
  IconType,
} from "./types";
import type { KonvaEventObject } from "konva/lib/Node";
import type Konva from "konva";
import { useImageLoader } from "@/components/hooks/use-image-loader";

interface ExtendedMapEditorProps extends MapEditorProps {
  gridEnabled?: boolean;
  gridSize?: number;
  fontSize?: number;
  iconType?: IconType;
}

export const MapEditor = forwardRef<MapEditorRef, ExtendedMapEditorProps>(
  (
    {
      mapImage,
      tool,
      color,
      strokeWidth,
      gridEnabled = false,
      gridSize = 20,
      fontSize = 16,
      iconType = "infantry",
    },
    ref
  ) => {
    const image = useImageLoader(mapImage);

    const [elements, setElements] = useState<
      (
        | PenElement
        | LineElement
        | ArrowElement
        | CircleElement
        | IconElement
        | TextElement
      )[]
    >([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [tooltips, setTooltips] = useState<TooltipData[]>([]);
    const [textInput, setTextInput] = useState<string>("");
    const [showTextInput, setShowTextInput] = useState<boolean>(false);
    const [textPosition, setTextPosition] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0,
    });
    const stageRef = useRef<Konva.Stage>(null);
    const layerRef = useRef<Konva.Layer>(null);

    // Calculate stage dimensions based on window size
    const stageWidth = 750;
    const stageHeight = 750;

    useImperativeHandle(ref, () => ({
      getMapData: (): MapData => {
        return {
          elements,
          tooltips,
          gridEnabled,
          gridSize,
        };
      },
      loadMapData: (data: MapData) => {
        if (data) {
          setElements(data.elements || []);
          setTooltips(data.tooltips || []);
        }
      },
      clearAll: () => {
        setElements([]);
        setTooltips([]);
        setSelectedId(null);
      },
      deleteSelected: () => {
        if (selectedId) {
          setElements(elements.filter((el) => el.id !== selectedId));
          setTooltips(tooltips.filter((t) => t.id !== selectedId));
          setSelectedId(null);
        }
      },
      getDataURL: () => {
        if (!stageRef.current) return "";
        return stageRef.current.toDataURL();
      },
      getThumbnail: () => {
        if (!stageRef.current) return "";
        // Create a smaller thumbnail
        return stageRef.current.toDataURL({
          pixelRatio: 0.5,
          width: 300,
          height: 200,
        });
      },
    }));

    // Handle text input submission
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (showTextInput) {
          const target = e.target as HTMLElement;
          if (!target.closest(".text-input-container")) {
            submitTextInput();
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [showTextInput, textInput, textPosition]);

    const submitTextInput = () => {
      if (textInput.trim() && showTextInput) {
        const newElement: TextElement = {
          id: nanoid(),
          tool: "text",
          x: textPosition.x,
          y: textPosition.y,
          text: textInput,
          fontSize,
          color,
          strokeWidth,
        };
        setElements([...elements, newElement]);
        setTextInput("");
        setShowTextInput(false);
      } else {
        setShowTextInput(false);
      }
    };

    // Function to snap position to grid
    const snapToGrid = (pos: { x: number; y: number }) => {
      if (!gridEnabled) return pos;

      return {
        x: Math.round(pos.x / gridSize) * gridSize,
        y: Math.round(pos.y / gridSize) * gridSize,
      };
    };

    const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (tool === "select") {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          setSelectedId(null);
          return;
        }
        return;
      }

      const stage = e.target.getStage();
      if (!stage) return;

      const pos = stage.getPointerPosition();
      if (!pos) return;

      // Snap to grid if enabled
      const snappedPos = snapToGrid(pos);

      if (tool === "text") {
        setTextPosition(snappedPos);
        setShowTextInput(true);
        return;
      }

      setIsDrawing(true);

      if (tool === "pen") {
        const newElement: PenElement = {
          id: nanoid(),
          tool,
          points: [snappedPos.x, snappedPos.y],
          color,
          strokeWidth,
        };
        setElements([...elements, newElement]);
      } else if (tool === "line" || tool === "arrow") {
        const newElement: LineElement | ArrowElement = {
          id: nanoid(),
          tool,
          points: [snappedPos.x, snappedPos.y, snappedPos.x, snappedPos.y],
          color,
          strokeWidth,
        };
        setElements([...elements, newElement]);
      } else if (tool === "circle") {
        const newElement: CircleElement = {
          id: nanoid(),
          tool,
          x: snappedPos.x,
          y: snappedPos.y,
          radius: 0,
          color,
          strokeWidth,
        };
        setElements([...elements, newElement]);
      } else if (tool === "icon") {
        const newElement: IconElement = {
          id: nanoid(),
          tool,
          x: snappedPos.x,
          y: snappedPos.y,
          iconType,
          color,
          strokeWidth,
        };
        setElements([...elements, newElement]);
      } else if (tool === "tooltip") {
        const newTooltip: TooltipData = {
          id: nanoid(),
          x: snappedPos.x,
          y: snappedPos.y,
          text: "New tooltip",
        };
        setTooltips([...tooltips, newTooltip]);
      }
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!isDrawing) return;

      const stage = e.target.getStage();
      if (!stage) return;

      const point = stage.getPointerPosition();
      if (!point) return;

      // Snap to grid if enabled
      const snappedPoint = snapToGrid(point);

      const lastIndex = elements.length - 1;
      const lastElement = elements[lastIndex];

      if (!lastElement) return;

      if (tool === "pen" && "points" in lastElement) {
        const newPoints = [
          ...lastElement.points,
          snappedPoint.x,
          snappedPoint.y,
        ];
        const updatedElement = {
          ...lastElement,
          points: newPoints,
        } as PenElement;
        const newElements = [...elements];
        newElements[lastIndex] = updatedElement;
        setElements(newElements);
      } else if (
        (tool === "line" || tool === "arrow") &&
        "points" in lastElement
      ) {
        const updatedElement = {
          ...lastElement,
          points: [
            lastElement.points[0],
            lastElement.points[1],
            snappedPoint.x,
            snappedPoint.y,
          ],
        } as LineElement | ArrowElement;
        const newElements = [...elements];
        newElements[lastIndex] = updatedElement;
        setElements(newElements);
      } else if (
        tool === "circle" &&
        "x" in lastElement &&
        "y" in lastElement
      ) {
        const dx = snappedPoint.x - lastElement.x;
        const dy = snappedPoint.y - lastElement.y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        const updatedElement = {
          ...lastElement,
          radius,
        } as CircleElement;
        const newElements = [...elements];
        newElements[lastIndex] = updatedElement;
        setElements(newElements);
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const handleElementClick = (id: string) => {
      if (tool === "select") {
        setSelectedId(id);
      }
    };

    const handleDragEnd = (e: KonvaEventObject<DragEvent>, id: string) => {
      const index = elements.findIndex((el) => el.id === id);
      if (index !== -1) {
        const element = elements[index];

        // Snap position to grid if enabled
        const newPos = gridEnabled
          ? snapToGrid({ x: e.target.x(), y: e.target.y() })
          : { x: e.target.x(), y: e.target.y() };

        if ("x" in element) {
          const updatedElement = {
            ...element,
            x: newPos.x,
            y: newPos.y,
          };
          const newElements = [...elements];
          newElements[index] = updatedElement;
          setElements(newElements);
        }
      }
    };

    const handleTooltipDragEnd = (
      e: KonvaEventObject<DragEvent>,
      id: string
    ) => {
      const index = tooltips.findIndex((t) => t.id === id);
      if (index !== -1) {
        // Snap position to grid if enabled
        const newPos = gridEnabled
          ? snapToGrid({ x: e.target.x(), y: e.target.y() })
          : { x: e.target.x(), y: e.target.y() };

        const updatedTooltip = {
          ...tooltips[index],
          x: newPos.x,
          y: newPos.y,
        };
        const newTooltips = [...tooltips];
        newTooltips[index] = updatedTooltip;
        setTooltips(newTooltips);
      }
    };

    const handleTooltipTextChange = (id: string, newText: string) => {
      const index = tooltips.findIndex((t) => t.id === id);
      if (index !== -1) {
        const updatedTooltip = {
          ...tooltips[index],
          text: newText,
        };
        const newTooltips = [...tooltips];
        newTooltips[index] = updatedTooltip;
        setTooltips(newTooltips);
      }
    };

    const renderElement = (
      element:
        | PenElement
        | LineElement
        | ArrowElement
        | CircleElement
        | IconElement
        | TextElement
    ) => {
      const isSelected = selectedId === element.id;

      switch (element.tool) {
        case "pen":
          if ("points" in element) {
            return (
              <Line
                key={element.id}
                points={element.points}
                stroke={element.color}
                strokeWidth={element.strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                onClick={() => handleElementClick(element.id)}
                onTap={() => handleElementClick(element.id)}
                draggable={tool === "select"}
                onDragEnd={(e) => handleDragEnd(e, element.id)}
                shadowEnabled={isSelected}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.5}
              />
            );
          }
          return null;
        case "line":
          if ("points" in element) {
            return (
              <Line
                key={element.id}
                points={element.points}
                stroke={element.color}
                strokeWidth={element.strokeWidth}
                lineCap="round"
                onClick={() => handleElementClick(element.id)}
                onTap={() => handleElementClick(element.id)}
                draggable={tool === "select"}
                onDragEnd={(e) => handleDragEnd(e, element.id)}
                shadowEnabled={isSelected}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.5}
              />
            );
          }
          return null;
        case "arrow":
          if ("points" in element) {
            return (
              <Arrow
                key={element.id}
                points={element.points}
                stroke={element.color}
                strokeWidth={element.strokeWidth}
                fill={element.color}
                pointerLength={10}
                pointerWidth={10}
                onClick={() => handleElementClick(element.id)}
                onTap={() => handleElementClick(element.id)}
                draggable={tool === "select"}
                onDragEnd={(e) => handleDragEnd(e, element.id)}
                shadowEnabled={isSelected}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.5}
              />
            );
          }
          return null;
        case "circle":
          if ("x" in element && "y" in element && "radius" in element) {
            return (
              <Circle
                key={element.id}
                x={element.x}
                y={element.y}
                radius={element.radius}
                stroke={element.color}
                strokeWidth={element.strokeWidth}
                onClick={() => handleElementClick(element.id)}
                onTap={() => handleElementClick(element.id)}
                draggable={tool === "select"}
                onDragEnd={(e) => handleDragEnd(e, element.id)}
                shadowEnabled={isSelected}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.5}
              />
            );
          }
          return null;
        case "icon":
          if ("x" in element && "y" in element && "iconType" in element) {
            const iconInfo = getMilitaryIcon(element.iconType);
            return (
              <Group
                key={element.id}
                x={element.x}
                y={element.y}
                onClick={() => handleElementClick(element.id)}
                onTap={() => handleElementClick(element.id)}
                draggable={tool === "select"}
                onDragEnd={(e) => handleDragEnd(e, element.id)}
              >
                <Circle
                  radius={20}
                  fill={element.color}
                  shadowEnabled={isSelected}
                  shadowColor="black"
                  shadowBlur={10}
                  shadowOpacity={0.5}
                />
                <Text
                  text={iconInfo.symbol}
                  fontSize={18}
                  x={-9}
                  y={-9}
                  fill="#ffffff"
                />
              </Group>
            );
          }
          return null;
        case "text":
          if ("x" in element && "y" in element && "text" in element) {
            return (
              <Text
                key={element.id}
                x={element.x}
                y={element.y}
                text={element.text}
                fontSize={element.fontSize || 16}
                fill={element.color}
                onClick={() => handleElementClick(element.id)}
                onTap={() => handleElementClick(element.id)}
                draggable={tool === "select"}
                onDragEnd={(e) => handleDragEnd(e, element.id)}
                shadowEnabled={isSelected}
                shadowColor="black"
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
              />
            );
          }
          return null;
        default:
          return null;
      }
    };

    const renderTooltips = () => {
      return tooltips.map((tooltip) => (
        <Group
          key={tooltip.id}
          x={tooltip.x}
          y={tooltip.y}
          draggable={tool === "select"}
          onDragEnd={(e) => handleTooltipDragEnd(e, tooltip.id)}
          onClick={() => handleElementClick(tooltip.id)}
        >
          <Circle
            radius={10}
            fill="white"
            stroke="black"
            strokeWidth={1}
            shadowEnabled={selectedId === tooltip.id}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.5}
          />
          <Text text="i" fontSize={14} fontStyle="bold" x={-4} y={-7} />
          {/* Tooltip content is rendered outside of Konva */}
        </Group>
      ));
    };

    // Render grid
    const renderGrid = () => {
      if (!gridEnabled) return null;

      const gridLines = [];

      // Vertical lines
      for (let x = 0; x <= stageWidth; x += gridSize) {
        gridLines.push(
          <Line
            key={`v-${x}`}
            points={[x, 0, x, stageHeight]}
            stroke="#ddd"
            strokeWidth={0.5}
          />
        );
      }

      // Horizontal lines
      for (let y = 0; y <= stageHeight; y += gridSize) {
        gridLines.push(
          <Line
            key={`h-${y}`}
            points={[0, y, stageWidth, y]}
            stroke="#ddd"
            strokeWidth={0.5}
          />
        );
      }

      return gridLines;
    };

    // This component renders React tooltips outside of Konva
    const TooltipOverlay = () => {
      if (!stageRef.current) return null;

      const stage = stageRef.current;
      const stageRect = stage.container().getBoundingClientRect();

      return (
        <TooltipProvider>
          <div className="absolute top-0 left-0 pointer-events-none">
            {tooltips.map((tooltip) => {
              const x = tooltip.x + stageRect.left;
              const y = tooltip.y + stageRect.top;

              return (
                <Tooltip key={tooltip.id}>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute w-5 h-5 rounded-full bg-transparent pointer-events-auto cursor-help"
                      style={{ left: x - 10, top: y - 10 }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip.text}</p>
                    {selectedId === tooltip.id && (
                      <input
                        type="text"
                        value={tooltip.text}
                        onChange={(e) =>
                          handleTooltipTextChange(tooltip.id, e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 p-1 border rounded text-sm w-full"
                      />
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      );
    };

    // Text input overlay
    const TextInputOverlay = () => {
      if (!showTextInput) return null;

      const stage = stageRef.current;
      if (!stage) return null;

      const stageRect = stage.container().getBoundingClientRect();
      const x = textPosition.x + stageRect.left;
      const y = textPosition.y + stageRect.top;

      return (
        <div
          className="absolute text-input-container"
          style={{ left: x, top: y }}
        >
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitTextInput();
              }
            }}
            autoFocus
            className="p-1 border rounded text-sm"
            style={{ color: color }}
          />
        </div>
      );
    };

    return (
      <div className="relative w-fit h-fit">
        <Stage
          ref={stageRef}
          width={stageWidth}
          height={stageHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="bg-white"
        >
          <Layer ref={layerRef}>
            {image && (
              <Image
                image={image}
                width={stageWidth}
                height={stageHeight}
                x={0}
                y={0}
              />
            )}
            {gridEnabled && renderGrid()}
            {elements.map(renderElement)}
            {renderTooltips()}
          </Layer>
        </Stage>
        <TooltipOverlay />
        <TextInputOverlay />
      </div>
    );
  }
);

MapEditor.displayName = "MapEditor";
