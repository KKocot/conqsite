"use client";

import {
  MousePointer,
  Pen,
  Circle,
  ArrowRight,
  Minus,
  MapPin,
  Info,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { militaryIcons } from "./tactical-icons";
import type { ToolbarProps, IconType } from "./types";

export function Toolbar({
  selectedTool,
  setSelectedTool,
  selectedColor,
  setSelectedColor,
  strokeWidth,
  setStrokeWidth,
  onClearAll,
  onDeleteSelected,
  gridEnabled,
  setGridEnabled,
  gridSize,
  setGridSize,
  selectedFontSize,
  setSelectedFontSize,
  selectedIconType,
  setSelectedIconType,
}: ToolbarProps) {
  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "pen", icon: Pen, label: "Pen" },
    { id: "line", icon: Minus, label: "Line" },
    { id: "arrow", icon: ArrowRight, label: "Arrow" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "icon", icon: MapPin, label: "Icon" },
    { id: "text", icon: Type, label: "Text" },
    { id: "tooltip", icon: Info, label: "Tooltip" },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 border rounded-lg w-72 overflow-y-auto">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Drawing Tools</h3>
              <div className="grid grid-cols-4 gap-2">
                {tools.map((tool) => (
                  <Tooltip key={tool.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={
                          selectedTool === tool.id ? "default" : "outline"
                        }
                        size="icon"
                        onClick={() => setSelectedTool(tool.id)}
                        className="h-10 w-10"
                      >
                        <tool.icon className="h-5 w-5" />
                        <span className="sr-only">{tool.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tool.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {selectedTool === "icon" && (
              <div>
                <h3 className="font-medium mb-2">Icon Type</h3>
                <Select
                  value={selectedIconType}
                  onValueChange={(value) =>
                    setSelectedIconType(value as IconType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon type" />
                  </SelectTrigger>
                  <SelectContent>
                    {militaryIcons.map((icon) => (
                      <SelectItem key={icon.type} value={icon.type}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icon.symbol}</span>
                          <span>{icon.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Actions</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onDeleteSelected}
                  className="flex items-center gap-1 flex-1"
                >
                  <X size={14} />
                  Delete Selected
                </Button>
                <Button
                  variant="outline"
                  onClick={onClearAll}
                  className="flex items-center gap-1 flex-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Clear All
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="grid grid-cols-6 gap-2 mb-2">
                {[
                  "#ff0000",
                  "#00ff00",
                  "#0000ff",
                  "#ffff00",
                  "#ff00ff",
                  "#000000",
                  "#ffffff",
                  "#888888",
                  "#ff8800",
                  "#00ffff",
                  "#8800ff",
                  "#88ff00",
                ].map((color) => (
                  <Tooltip key={color}>
                    <TooltipTrigger asChild>
                      <button
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color
                            ? "border-gray-900"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <Input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full h-8 p-1 border rounded"
              />
            </div>

            <div>
              <Label htmlFor="stroke-width" className="font-medium">
                Stroke Width: {strokeWidth}px
              </Label>
              <Slider
                id="stroke-width"
                min={1}
                max={20}
                step={1}
                value={[strokeWidth]}
                onValueChange={(value) => setStrokeWidth(value[0])}
                className="mt-2"
              />
            </div>

            {selectedTool === "text" && (
              <div>
                <Label htmlFor="font-size" className="font-medium">
                  Font Size: {selectedFontSize}px
                </Label>
                <Slider
                  id="font-size"
                  min={8}
                  max={48}
                  step={1}
                  value={[selectedFontSize]}
                  onValueChange={(value) => setSelectedFontSize(value[0])}
                  className="mt-2"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="grid-toggle" className="font-medium">
                  Grid
                </Label>
                <p className="text-sm text-gray-500">
                  Show grid lines on the canvas
                </p>
              </div>
              <Switch
                id="grid-toggle"
                checked={gridEnabled}
                onCheckedChange={setGridEnabled}
              />
            </div>

            {gridEnabled && (
              <div>
                <Label htmlFor="grid-size" className="font-medium">
                  Grid Size: {gridSize}px
                </Label>
                <Slider
                  id="grid-size"
                  min={10}
                  max={50}
                  step={5}
                  value={[gridSize]}
                  onValueChange={(value) => setGridSize(value[0])}
                  className="mt-2"
                />
              </div>
            )}

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Keyboard Shortcuts</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-mono px-1 rounded">Delete</span> -
                  Delete selected element
                </p>
                <p>
                  <span className="font-mono px-1 rounded">Enter</span> -
                  Confirm text input
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
