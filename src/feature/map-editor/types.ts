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
  iconType: string;
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
  gridEnabled?: boolean;
  gridSize?: number;
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
  deleteSelected: () => void;
  getDataURL: () => string;
  getThumbnail: () => string;
}

export interface MapEditorProps {
  mapImage: string;
  tool: string;
  color: string;
  strokeWidth: number;
  gridEnabled?: boolean;
  gridSize?: number;
  fontSize?: number;
  iconType?: IconType;
}

export interface ToolbarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  onClearAll: () => void;
  gridEnabled: boolean;
  setGridEnabled: (enabled: boolean) => void;
  gridSize: number;
  setGridSize: (size: number) => void;
  selectedFontSize: number;
  setSelectedFontSize: (size: number) => void;
  selectedIconType: string;
  setSelectedIconType: (type: string) => void;
  selectedMapImage: string;
  setSelectedMapImage: (image: string) => void;
  dates: UseQueryResult<string[], Error>;
  onDateChange: (date: string) => void;
  lineupSheets: PublicLineup[] | null;
  currentLineup: PublicLineup | null;
  setCurrentLineup: (lineup: PublicLineup) => void;
  unitsAssetsList: {
    name: string;
    icon: string;
  }[];
  artAssets: UseQueryResult<ArtilleryAsset[], Error>;
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
