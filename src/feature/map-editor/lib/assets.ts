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
  width: 750,
  height: 750,
};

export const DEFAULT_TOOLS_CONFIG: ToolsConfig = {
  tool: "select",
  iconValue: "",
  toolColor: "#000000",
  size: 4,
};
