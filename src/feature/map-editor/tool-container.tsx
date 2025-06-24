import clsx from "clsx";
import { ReactNode } from "react";
import { ToolsConfig } from "./lib/types";
import { DEFAULT_TOOLS_CONFIG } from "./lib/assets";

const ToolContainer = ({
  children,
  currentTool,
  toolName,
  onToolChange,
}: {
  children: ReactNode;
  currentTool: boolean;
  toolName: ToolsConfig["tool"];
  onToolChange: (tool: ToolsConfig) => void;
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center p-2 cursor-pointer hover:bg-accent hover:text-background border-2 border-background-foreground",
        {
          "border-accent": currentTool,
        }
      )}
      onClick={() =>
        onToolChange({
          ...DEFAULT_TOOLS_CONFIG,
          tool: toolName,
          size:
            toolName === "unitIcon" || toolName === "artilleryIcon"
              ? 25
              : DEFAULT_TOOLS_CONFIG.size,
          iconValue:
            toolName === "unitIcon"
              ? "Siphonarioi"
              : toolName === "artilleryIcon"
              ? "Ballista"
              : DEFAULT_TOOLS_CONFIG.iconValue,
        })
      }
    >
      {children}
    </div>
  );
};
export default ToolContainer;
