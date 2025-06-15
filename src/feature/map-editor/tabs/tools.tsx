import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowRight,
  Circle,
  Info,
  Minus,
  MousePointer,
  Pen,
  Sword,
  Trash2,
  Type,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ToolbarState, ToolsProps } from "../types";
import Image from "next/image";

interface ToolProp {
  id: ToolsProps;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}
const tools: ToolProp[] = [
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

const ToolsTab = ({
  values: { currentTool, iconValue, toolColor, strokeWidth, selectedFontSize },
  unitsAssetsList,
  onChangeTool,
  onClearAll,
}: {
  values: ToolbarState;
  unitsAssetsList: { name: string; icon: string }[];
  onClearAll: () => void;
  onChangeTool: Dispatch<SetStateAction<ToolbarState>>;
}) => {
  return (
    <div>
      <div>
        <h3 className="font-medium mb-2">Drawing Tools</h3>
        <div className="grid grid-cols-4 gap-2">
          {tools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={currentTool === tool.id ? "default" : "outline"}
                  size="icon"
                  onClick={() =>
                    onChangeTool((prev) => ({ ...prev, currentTool: tool.id }))
                  }
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

      {currentTool === "icon" && (
        <div>
          <h3 className="font-medium mb-2">Icon Type</h3>
          <Select
            value={iconValue}
            onValueChange={(value) =>
              onChangeTool((prev) => ({ ...prev, iconValue: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon type" />
            </SelectTrigger>
            <SelectContent>
              {unitsAssetsList.map((icon) => (
                <SelectItem key={icon.name} value={icon.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      alt={icon.name}
                      src={`${
                        process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                      }/images/unit-icons/${icon.name
                        .toLowerCase()
                        .replace(/[ ':]/g, "-")}-icon.png`}
                      width={24}
                      height={24}
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
                      toolColor === color
                        ? "border-gray-900"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      onChangeTool((prev) => ({ ...prev, toolColor: color }))
                    }
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
            value={toolColor}
            onChange={(e) =>
              onChangeTool((prev) => ({ ...prev, toolColor: e.target.value }))
            }
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
            onValueChange={(value) =>
              onChangeTool((prev) => ({ ...prev, strokeWidth: value[0] }))
            }
            className="mt-2"
          />
        </div>

        {currentTool === "text" && (
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
              onValueChange={(value) =>
                onChangeTool((prev) => ({
                  ...prev,
                  selectedFontSize: value[0],
                }))
              }
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
    </div>
  );
};

export default ToolsTab;
