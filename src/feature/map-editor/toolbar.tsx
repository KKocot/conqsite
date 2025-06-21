"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineupsTab from "./tabs/lineups";
import { ArtilleryAsset } from "@/lib/get-data";
import ToolsTab from "./tabs/tools";
import { ToolbarState } from "./lib/types";
import { Dispatch, SetStateAction } from "react";

export function Toolbar({
  unitsAssetsList,
  artAssets,
  dates,
  house,
  toolbarState,
  setToolbarState,
  handleClearAll,
}: {
  unitsAssetsList: { name: string; icon: string }[];
  artAssets?: ArtilleryAsset[];
  dates?: string[];
  house: string;
  toolbarState: ToolbarState;
  setToolbarState: Dispatch<SetStateAction<ToolbarState>>;
  handleClearAll: () => void;
}) {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 border rounded-lg w-72 overflow-y-auto">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="mb-2 flex flex-wrap h-fit">
            <TabsTrigger value="lineups">Lineups</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
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
              onClearAll={handleClearAll}
            />
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
