"use client";

import {
  MousePointer,
  Pen,
  Circle,
  ArrowRight,
  Minus,
  Sword,
  Info,
  Trash2,
  Type,
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
import type { ToolbarProps } from "./types";
import clsx from "clsx";

const maps = [
  { name: "Map 1", image: "/maps/1-1.jpg", occurrence: ["map1", "map2"] },
  { name: "Map 2", image: "/maps/fort1.jpg", occurrence: ["map3", "map4"] },
];
const tools = [
  { id: "select", icon: MousePointer, label: "Select" },
  { id: "pen", icon: Pen, label: "Pen" },
  { id: "line", icon: Minus, label: "Line" },
  { id: "arrow", icon: ArrowRight, label: "Arrow" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "icon", icon: Sword, label: "Icon" },
  { id: "text", icon: Type, label: "Text" },
  { id: "tooltip", icon: Info, label: "Tooltip" },
  { id: "delete", icon: Trash2, label: "Delete" },
];
export function Toolbar({
  selectedTool,
  setSelectedTool,
  selectedColor,
  setSelectedColor,
  strokeWidth,
  setStrokeWidth,
  onClearAll,
  gridEnabled,
  setGridEnabled,
  gridSize,
  setGridSize,
  selectedFontSize,
  setSelectedFontSize,
  selectedIconType,
  setSelectedIconType,
  selectedMapImage,
  setSelectedMapImage,
  dates,
  onDateChange,
  lineupSheets,
  currentLineup,
  setCurrentLineup,
  unitsAssetsList,
  artAssets,
}: ToolbarProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 border rounded-lg w-72 overflow-y-auto">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="mb-2 flex flex-wrap h-fit">
            <TabsTrigger value="maps">Maps</TabsTrigger>
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="maps" className="space-y-4">
            <div className="space-y-2">
              {maps.map((map) => (
                <div
                  key={map.name}
                  className={clsx(
                    "flex items-center gap-3 p-2 border rounded-lg cursor-pointer",
                    {
                      "bg-background": selectedMapImage === map.image,
                    }
                  )}
                  onClick={() => setSelectedMapImage(map.image)}
                >
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <img
                      src={map.image}
                      alt={map.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{map.name}</h4>
                    <div className="flex gap-1 flex-wrap">
                      {map.occurrence.map((occ) => (
                        <span key={occ} className="text-xs px-2 py-0.5 rounded">
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="lineups" className="space-y-4">
            <div className="space-y-2">
              <Select onValueChange={onDateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  {!dates.data || dates.isLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    dates.data.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <div className="flex flex-col gap-2 items-center">
                {!lineupSheets ? (
                  <div>Load Date</div>
                ) : (
                  lineupSheets.map((sheet) => (
                    <Button
                      variant="ghost"
                      key={sheet.name}
                      className={clsx("p-1 w-full", {
                        "bg-background":
                          !!currentLineup && currentLineup.name === sheet.name,
                      })}
                      onClick={() => {
                        setCurrentLineup(sheet);
                      }}
                    >
                      {sheet.name}
                    </Button>
                  ))
                )}
              </div>
              <div>
                {!!currentLineup && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium mb-2">Current Lineup</h3>
                    <div className="flex flex-col gap-1">
                      {currentLineup.sheet
                        .filter((e) => e.username !== "")
                        .map((member, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium">{`${i + 1}. ${
                                member.username
                              }`}</h4>
                              <div className="flex gap-1">
                                {member.unit1 !== "" ? (
                                  <img
                                    src={
                                      unitsAssetsList.find(
                                        (e) => e.name === member.unit1
                                      )?.icon
                                    }
                                    alt={member.unit1}
                                    className="w-6 h-6"
                                  />
                                ) : null}
                                {member.unit2 !== "" ? (
                                  <img
                                    src={
                                      unitsAssetsList.find(
                                        (e) => e.name === member.unit2
                                      )?.icon
                                    }
                                    alt={member.unit2}
                                    className="w-6 h-6"
                                  />
                                ) : null}
                                {member.unit3 !== "" ? (
                                  <img
                                    src={
                                      unitsAssetsList.find(
                                        (e) => e.name === member.unit3
                                      )?.icon
                                    }
                                    alt={member.unit3}
                                    className="w-6 h-6"
                                  />
                                ) : null}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {!!member.artillery && !!artAssets.data
                                ? member.artillery
                                    .filter((elem) => elem.check)
                                    .map((e, i) => (
                                      <img
                                        key={i}
                                        src={
                                          artAssets.data.find(
                                            (asset) => asset.id === e.id
                                          )?.src
                                        }
                                        alt={e.id.toString()}
                                        className="w-6 h-6 rounded-full"
                                      />
                                    ))
                                : null}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
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
                  onValueChange={(value) => setSelectedIconType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon type" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitsAssetsList.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center gap-2">
                          <img
                            src={icon.icon}
                            alt={icon.name}
                            className="w-6 h-6"
                          />
                          <span>{icon.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
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
            </div>
            <div>
              <h3 className="font-medium mb-2">Actions</h3>
              <Button
                variant="outline"
                onClick={onClearAll}
                className="flex items-center gap-1 flex-1 text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
                Clear All
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="grid-toggle" className="font-medium">
                  Grid
                </Label>
                <p className="text-sm">Show grid lines on the canvas</p>
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
