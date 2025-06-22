import { CardHeader } from "@/components/ui/card";
import { ToolsConfig } from "./lib/types";
import { Dispatch, SetStateAction } from "react";
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
} from "lucide-react";

const Header = ({
  values,
  onValueChange,
}: {
  values: ToolsConfig;
  onValueChange: Dispatch<SetStateAction<ToolsConfig>>;
}) => {
  return (
    <CardHeader className="flex flex-row justify-around items-center gap-2 flex-wrap p-2">
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
        currentTool={values.tool === "tooltip"}
        toolName="tooltip"
        onToolChange={onValueChange}
      >
        <BadgeInfoIcon className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "text"}
        toolName="text"
        onToolChange={onValueChange}
      >
        <ScrollText className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "delete"}
        toolName="delete"
        onToolChange={onValueChange}
      >
        <Trash2 className="h-4 w-4" />
      </ToolContainer>
      <ToolContainer
        currentTool={values.tool === "map"}
        toolName="map"
        onToolChange={onValueChange}
      >
        <Map className="h-4 w-4" />
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
