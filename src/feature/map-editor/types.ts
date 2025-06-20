import { ArtilleryAsset, PublicLineup, UnitAssetsGroup } from "@/lib/get-data";
import { UseQueryResult } from "@tanstack/react-query";

export interface MapElement {
  id: string;
  tool: string;
  color: string;
  strokeWidth: number;
  zIndex?: number;
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

export interface Plan {
  id: string;
  name: string;
  mapImage: string;
  elements: MapData;
  createdAt: string;
  updatedAt: string;
  version: number;
  thumbnail?: string;
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
