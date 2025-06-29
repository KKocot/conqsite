import { CardHeader } from "@/components/ui/card";
import { ToolsConfig } from "./lib/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import ToolContainer from "./tool-container";
import {
  ArrowRightIcon,
  BadgeInfoIcon,
  Car,
  Circle,
  Minus,
  MousePointer,
  Pen,
  ScrollText,
  Sword,
  Trash2,
  Map,
  BookTemplate,
  Send,
  LandPlot,
  BellRing,
  Info,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Header = ({
  values,
  onValueChange,
}: {
  values: ToolsConfig;
  onValueChange: Dispatch<SetStateAction<ToolsConfig>>;
}) => {
  useEffect(() => {
    const shortcuts: Record<string, ToolsConfig["tool"]> = {
      v: "select",
      p: "pen",
      l: "line",
      a: "arrow",
      c: "circle",
      d: "delete",
      u: "unitIcon",
      g: "artilleryIcon",
      o: "otherIcon",
      t: "tooltip",
      x: "text",
      m: "map",
      n: "ping",
      b: "templates",
      s: "public",
      i: "info",
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const tool = shortcuts[e.key.toLowerCase()];
      if (tool) {
        onValueChange((prev) => ({ ...prev, tool }));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onValueChange]);

  return (
    <CardHeader className="flex flex-row justify-around items-center gap-1 flex-wrap p-2">
      <ToolContainer
        currentTool={values.tool === "select"}
        toolName="select"
        onToolChange={onValueChange}
      >
        <MousePointer className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "pen"}
        toolName="pen"
        onToolChange={onValueChange}
      >
        <Pen className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "line"}
        toolName="line"
        onToolChange={onValueChange}
      >
        <Minus className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "arrow"}
        toolName="arrow"
        onToolChange={onValueChange}
      >
        <ArrowRightIcon className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "circle"}
        toolName="circle"
        onToolChange={onValueChange}
      >
        <Circle className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "delete"}
        toolName="delete"
        onToolChange={onValueChange}
      >
        <Trash2 className="h-4 w-4" />
      </ToolContainer>
      <Separator />
      <ToolContainer
        currentTool={values.tool === "unitIcon"}
        toolName="unitIcon"
        onToolChange={onValueChange}
      >
        <Sword className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "artilleryIcon"}
        toolName="artilleryIcon"
        onToolChange={onValueChange}
      >
        <Car className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "otherIcon"}
        toolName="otherIcon"
        onToolChange={onValueChange}
      >
        <LandPlot className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "tooltip"}
        toolName="tooltip"
        onToolChange={onValueChange}
      >
        <BadgeInfoIcon className="h-4 w-4" />
      </ToolContainer>
      <Separator />
      <ToolContainer
        currentTool={values.tool === "text"}
        toolName="text"
        onToolChange={onValueChange}
      >
        <ScrollText className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "map"}
        toolName="map"
        onToolChange={onValueChange}
      >
        <Map className="h-4 w-4" />
      </ToolContainer>
      <Separator />
      <ToolContainer
        currentTool={values.tool === "info"}
        toolName="info"
        onToolChange={onValueChange}
      >
        <Info className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "ping"}
        toolName="ping"
        onToolChange={onValueChange}
      >
        <BellRing className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "templates"}
        toolName="templates"
        onToolChange={onValueChange}
      >
        <BookTemplate className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "public"}
        toolName="public"
        onToolChange={onValueChange}
      >
        <Send className="h-4 w-4" />
      </ToolContainer>
    </CardHeader>
  );
};
export default Header;
