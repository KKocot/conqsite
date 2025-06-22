"use client";

import MapFrame from "@/feature/map-editor/map-frame";
import { useLocalStorage } from "usehooks-ts";
import { Plan } from "@/feature/map-editor/lib/types";
import { DEFAULT_PLANS } from "@/feature/map-editor/lib/assets";
import { useEffect, useState } from "react";

export default function TacticalMapPage({ house }: { house: string }) {
  const [storedPlans, setStoredPlans] = useLocalStorage<Plan[]>(
    "mapPlans",
    DEFAULT_PLANS
  );
  const [currentPlan, setCurrentPlan] = useState<Plan[]>(storedPlans);

  useEffect(() => {
    setStoredPlans(currentPlan);
  }, [currentPlan, setStoredPlans]);

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Tactical Map Editor
        </h1>
      </div>

      <MapFrame
        plan={currentPlan}
        onPlanChange={setCurrentPlan}
        house={house}
      />
    </div>
  );
}
