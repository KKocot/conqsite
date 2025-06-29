import { PublicLineup } from "@/lib/get-data";

export type Elements =
  | PenElement
  | LineElement
  | ArrowElement
  | CircleElement
  | IconElement
  | TextElement;

export interface Plan {
  _id?: string;
  title: string;
  description: string;
  map: string;
  index: number;
  elements: Elements[];
}

export interface MapElement {
  id: string;
  tool: string;
  color: string;
  strokeWidth: number;
  zIndex?: number;
}

export interface ToolsConfig {
  tool:
    | "select"
    | "pen"
    | "line"
    | "arrow"
    | "circle"
    | "unitIcon"
    | "artilleryIcon"
    | "tooltip"
    | "delete"
    | "text"
    | "map"
    | "templates"
    | "public"
    | "otherIcon"
    | "zoom"
    | "ping"
    | "info";
  artyIconValue: string;
  otherIconValue: string;
  unitIconValue: string;
  tooltipValue: string;
  toolColor: string;
  linesSize: number;
  iconsSize: number;
  tooltipSize: number;
}

export interface PenElement extends MapElement {
  points: number[];
}

export interface LineElement extends MapElement {
  points: number[];
}

export interface ArrowElement extends MapElement {
  points: number[];
}

export interface CircleElement extends MapElement {
  x: number;
  y: number;
  radius: number;
}

export interface IconElement extends MapElement {
  x: number;
  y: number;
  iconValue: string;
}

export interface IconElementWithTooltip extends IconElement {
  tooltipSize: number;
  x: number;
  y: number;
  iconValue: string;
}

export interface TextElement extends MapElement {
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

export interface TooltipData {
  id: string;
  x: number;
  y: number;
  text: string;
}

export interface MapData {
  elements: (
    | PenElement
    | LineElement
    | ArrowElement
    | CircleElement
    | IconElement
    | TextElement
  )[];
  tooltips: TooltipData[];
}

export interface MapEditorRef {
  getMapData: () => MapData;
  loadMapData: (data: MapData) => void;
  clearAll: () => void;
  getDataURL: () => string;
  getThumbnail: () => string;
}

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export type IconType = string;

export interface IconDefinition {
  type: IconType;
  symbol: string;
  label: string;
}

export type ToolsProps =
  | "select"
  | "pen"
  | "line"
  | "arrow"
  | "circle"
  | "icon"
  | "icon"
  | "text"
  | "tooltip"
  | "delete";
export interface ToolbarState {
  map: string;
  lineup: PublicLineup;
  currentTool: ToolsProps;
  iconValue: string;
  toolColor: string;
  strokeWidth: number;
  selectedFontSize: number;
}
