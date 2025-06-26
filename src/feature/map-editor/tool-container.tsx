import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { ToolsConfig } from "./lib/types";

const ToolContainer = ({
  children,
  currentTool,
  toolName,
  onToolChange,
}: {
  children: ReactNode;
  currentTool: boolean;
  toolName: ToolsConfig["tool"];
  onToolChange: Dispatch<SetStateAction<ToolsConfig>>;
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
        onToolChange((prev) => ({
          ...prev,
          tool: toolName,
          size:
            (toolName === "unitIcon" || toolName === "artilleryIcon") &&
            prev.size === 4
              ? 25
              : prev.size,
        }))
      }
    >
      {children}
    </div>
  );
};
export default ToolContainer;
