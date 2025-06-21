"use client";

import TooltipContainer from "@/components/tooltip-container";
import MapEditor from "./editor";
import { Plan, ToolsConfig } from "./lib/types";
import { BookTemplate, Map, Send, Sheet } from "lucide-react";
import MapPicker from "./sidemenu/map-picker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LayersMenu from "./sidemenu/layers-menu";
import ToolbarMenu from "./toolbar/toolbar-menu";
import { DEFAULT_TOOLS_CONFIG } from "./lib/assets";

const MapFrame = ({
  units,
  plan,
  onPlanChange,
}: {
  units: string[];
  plan: Plan[];
  onPlanChange: Dispatch<SetStateAction<Plan[]>>;
}) => {
  const [currentPlan, setCurrentPlan] = useState<Plan>(plan[0]);
  const [toolsConfig, setToolsConfig] =
    useState<ToolsConfig>(DEFAULT_TOOLS_CONFIG);

  useEffect(() => {
    if (plan.length > 0) {
      onPlanChange((prev) => {
        const updatedPlans = prev.map((p) =>
          p.index === currentPlan.index ? currentPlan : p
        );
        return updatedPlans;
      });
    }
  }, [JSON.stringify(currentPlan)]);
  return (
    <div className="flex justify-center gap-2 overflow-hidden">
      <LayersMenu
        layers={plan}
        onLayerChange={onPlanChange}
        currentLayer={currentPlan}
        onCurrentLayerChange={(currentLayer) => setCurrentPlan(currentLayer)}
      />
      <MapEditor
        plan={currentPlan}
        currentTool={toolsConfig}
        onPlanChange={setCurrentPlan}
      />
      <ToolbarMenu
        values={toolsConfig}
        onValueChange={setToolsConfig}
        onTitleChange={(title) =>
          setCurrentPlan((prev) => ({ ...prev, title }))
        }
        onDescriptionChange={(description) =>
          setCurrentPlan((prev) => ({ ...prev, description }))
        }
        title={currentPlan.title}
        description={currentPlan.description}
      />
      <nav className="fixed bottom-4 right-4 z-50 flex gap-2 rounded-full bg-background px-1 py-2 shadow-lg">
        <TooltipContainer title="Maps" side="top">
          <MapPicker
            value={currentPlan.map}
            onChange={(map) => setCurrentPlan((prev) => ({ ...prev, map }))}
          />
        </TooltipContainer>
        <TooltipContainer title="Public Plan" side="top">
          <div className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background">
            <Send className="h-5 w-5" />
          </div>
        </TooltipContainer>
        <TooltipContainer title="Save Template" side="top">
          <div className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background">
            <BookTemplate className="h-5 w-5" />
          </div>
        </TooltipContainer>
      </nav>
    </div>
  );
};
export default MapFrame;
