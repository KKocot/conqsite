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
  tool: "map",
  iconValue: "",
  toolColor: "#ff0000",
  size: 4,
};
