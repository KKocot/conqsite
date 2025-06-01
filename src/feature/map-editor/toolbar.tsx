"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapsTab from "./tabs/maps";
import { useState } from "react";
import LineupsTab from "./tabs/lineups";
import { ArtilleryAsset, PublicLineup } from "@/lib/get-data";
import ToolsTab from "./tabs/tools";

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
export function Toolbar({
  unitsAssetsList,
  artAssets,
  dates,
  house,
}: {
  unitsAssetsList: { name: string; icon: string }[];
  artAssets?: ArtilleryAsset[];
  dates?: string[];
  house: string;
}) {
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    map: "",
    lineup: {
      house: house,
      name: "",
      date: "",
      sheet: [],
      change_nick: false,
    },
    currentTool: "select",
    iconValue: "",
    toolColor: "#ff0000",
    strokeWidth: 3,
    selectedFontSize: 16,
  });
  const onClearAll = () => console.log("Clear all elements");

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 border rounded-lg w-72 overflow-y-auto">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="mb-2 flex flex-wrap h-fit">
            <TabsTrigger value="maps">Maps</TabsTrigger>
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          <TabsContent value="maps" className="space-y-4">
            <MapsTab
              value={toolbarState.map}
              onChange={(map) => setToolbarState((prev) => ({ ...prev, map }))}
            />
          </TabsContent>
          <TabsContent value="lineups" className="space-y-4">
            {!!artAssets && !!dates ? (
              <LineupsTab
                artAssets={artAssets}
                dates={dates}
                unitsAssetsList={unitsAssetsList}
                house={house}
                value={toolbarState.lineup}
                onChangeLineup={(lineup) =>
                  setToolbarState((prev) => ({ ...prev, lineup }))
                }
              />
            ) : (
              <span>Loading</span>
            )}
          </TabsContent>
          <TabsContent value="tools" className="space-y-4">
            <ToolsTab
              unitsAssetsList={unitsAssetsList}
              values={toolbarState}
              onChangeTool={setToolbarState}
              onClearAll={onClearAll}
            />
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
