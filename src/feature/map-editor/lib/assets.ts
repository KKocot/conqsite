import { Plan, ToolsConfig } from "./types";

export const DEFAULT_PLAN: Plan = {
  map: "",
  index: 0,
  title: "",
  description: "",
  elements: [],
};
export const DEFAULT_PLANS: Plan[] = [DEFAULT_PLAN];

export const maps = ["1-1", "fort1"];

export const stageSize = {
  width: 800,
  height: 800,
};

export const DEFAULT_TOOLS_CONFIG: ToolsConfig = {
  tool: "select",
  iconValue: "",
  toolColor: "#ff0000",
  size: 4,
};
