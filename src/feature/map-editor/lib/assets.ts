import { Plan, ToolsConfig } from "./types";

export const DEFAULT_PLAN: Plan = {
  map: "",
  index: 0,
  title: "",
  description: "",
  elements: [],
};
export const DEFAULT_PLANS: Plan[] = [DEFAULT_PLAN];

export const stageSize = {
  width: 800,
  height: 800,
};

export const DEFAULT_TOOLS_CONFIG: ToolsConfig = {
  tool: "select",
  otherIconValue: "Supply Red",
  unitIconValue: "Siphonarioi",
  artyIconValue: "Bombard",
  tooltipValue: "",
  toolColor: "#ff0000",
  size: 4,
};

export const convertToColor = (color: string): string => {
  switch (color) {
    case "-red-700":
      return "#b91c1c";
    case "-blue-700":
      return "#1e40af";
    case "-cyan-700":
      return "#0e7490";
    case "-neutral-700":
      return "#374151";
    case "-orange-700":
      return "#c2410c";
    case "-yellow-700":
      return "#ca8a04";
    case "-lime-700":
      return "#4d7c0f";
    case "-teal-700":
      return "#115e59";
    case "-sky-700":
      return "#0369a1";
    case "-indigo-700":
      return "#4338ca";
    case "-violet-700":
      return "#7c3aed";
    case "-fuchsia-700":
      return "#a855f7";
    case "-rose-700":
      return "#be123c";
    case "-slate-700":
      return "#475569";
    default:
      return "#000000";
  }
};
