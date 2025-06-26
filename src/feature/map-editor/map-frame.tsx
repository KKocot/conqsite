"use client";

import MapEditor from "./editor";
import { Plan, ToolsConfig } from "./lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LayersMenu from "./layers-menu";
import ToolbarMenu from "./toolbar-menu";
import { DEFAULT_TOOLS_CONFIG } from "./lib/assets";
import { useLocalStorage } from "usehooks-ts";
import { PublicLineup } from "@/lib/get-data";

const MapFrame = ({
  plan,
  onPlanChange,
  house,
}: {
  plan: Plan[];
  onPlanChange: Dispatch<SetStateAction<Plan[]>>;
  house: string;
}) => {
  const [currentPlan, setCurrentPlan] = useState<Plan>(plan[0]);
  const [toolsConfig, setToolsConfig] =
    useState<ToolsConfig>(DEFAULT_TOOLS_CONFIG);
  const [storedLineup, setStoredLineup] = useLocalStorage<
    PublicLineup | undefined
  >("lineup", undefined);

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
        lineup={storedLineup}
      />
      <ToolbarMenu
        lineup={storedLineup}
        onChangeLineup={(lineup) => setStoredLineup(lineup)}
        map={currentPlan.map}
        plan={plan}
        onPlanChange={onPlanChange}
        onChangeCurrentPlan={setCurrentPlan}
        house={house}
        onCleanMap={() => {
          setCurrentPlan((prev) => ({
            ...prev,
            elements: [],
          }));
        }}
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
    </div>
  );
};
export default MapFrame;
