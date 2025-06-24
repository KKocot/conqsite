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
  iconValue: "",
  toolColor: "#ff0000",
  size: 4,
};

export const artillery = [
  "Ballista",
  "Optimal Mortar",
  "Bombard",
  "Optimal Scorpio",
  "Cannon",
  "Optimal Thunderstar (Lunar)",
  "Catapult",
  "Scorpio",
  "Culverin",
  "Siege Ballista",
  "Flaming Comet",
  "War Rockets",
  "Grapeshot Cannon",
  "Well Made Ballista",
  "Hwacha Arrow Launcher",
  "Well Made Cannon",
  "Optimal Ballista",
  "Well Made Culverin",
  "Optimal Cannon",
  "Well Made Firework Culverin",
  "Optimal Curverin",
  "Well Made Firework Mortar",
  "Optimal Dencing Dragon",
  "Well Made Grapeshot Cannon",
  "Optimal Firework Culverin",
  "Well Made Hwacha Launcher",
  "Optimal Firework Mortar",
  "Well Made Mortar",
  "Optimal Grapeshot Cannon",
  "Well Made Scorpio",
  "Optimal Hwacha Arrow Launcher",
  "Well Made Thunderstar (Lunar)",
  "Battle Ram",
  "Trebuchet",
  "Siege Tower",
];
