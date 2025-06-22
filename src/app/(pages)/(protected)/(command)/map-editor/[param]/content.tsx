"use client";

import { ArtilleryAsset, UnitAssetsGroup } from "@/lib/get-data";
import MapFrame from "@/feature/map-editor/map-frame";
import { useLocalStorage } from "usehooks-ts";
import { Plan } from "@/feature/map-editor/lib/types";
import { DEFAULT_PLANS } from "@/feature/map-editor/lib/assets";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ArrowBigLeftDashIcon } from "lucide-react";

const templates: any[] = []; // This should be fetched or defined based on your application logic
const publicLineups: any[] = []; // This should be fetched or defined based on your application logic

export default function TacticalMapPage({
  unitsAssets,
  artAssets,
}: {
  unitsAssets: UnitAssetsGroup;
  artAssets: ArtilleryAsset[];
}) {
  const units = [
    ...unitsAssets.goldenEra,
    ...unitsAssets.otherEra,
    ...unitsAssets.heroicEra,
    ...unitsAssets.blueEra,
    ...unitsAssets.greenEra,
    ...unitsAssets.greyEra,
  ].map((unit) => unit.name);
  const [storedPlans, setStoredPlans] = useLocalStorage<Plan[]>(
    "mapPlans",
    DEFAULT_PLANS
  );
  const [currentPlan, setCurrentPlan] = useState<Plan[]>(
    storedPlans || DEFAULT_PLANS
  );

  const [mode, setMode] = useState<
    "new" | "stored" | "template" | "public" | ""
    // >("");
  >("stored"); // Default mode is "", changed for development purposes
  useEffect(() => {
    if (mode !== "") {
      setStoredPlans(currentPlan);
    }
  }, [JSON.stringify(currentPlan)]);

  return (
    <div className="container mx-auto p-4 flex flex-col pb-24">
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setMode("")}
          variant="ghost"
          className={clsx("rounded-full", {
            "opacity-50 cursor-not-allowed": false,
          })}
        >
          <ArrowBigLeftDashIcon />
        </Button>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Tactical Map Editor
        </h1>
        <div className="w-14" />
      </div>

      {mode !== "" ? (
        <MapFrame
          artillery={artAssets}
          units={units}
          plan={currentPlan}
          onPlanChange={setCurrentPlan}
        />
      ) : (
        <div className="flex justify-evenly">
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Load Template</h2>
            {templates.length > 0 ? (
              <>
                <p className="text-sm">Use an existing map template</p>
                {templates.map((_, i) => (
                  <Button
                    key={i}
                    variant="custom"
                    onClick={() => setMode("template")}
                  >
                    Templates Name {i + 1}
                  </Button>
                ))}
              </>
            ) : (
              <p className="text-sm">No templates available</p>
            )}
          </div>
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Load Public Lineup</h2>
            {publicLineups.length > 0 ? (
              <>
                <p className="text-sm">Import from public lineup</p>
                {publicLineups.map((_, i) => (
                  <Button
                    key={i}
                    variant="custom"
                    onClick={() => setMode("public")}
                  >
                    Public Lineup Name {i + 1}
                  </Button>
                ))}
              </>
            ) : (
              <p className="text-sm">No public lineups available</p>
            )}
          </div>
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Continue</h2>
            <p className="text-sm">Resume previous work</p>
            <Button
              variant="custom"
              disabled={storedPlans[0].map === ""}
              onClick={() => {
                setCurrentPlan(storedPlans || DEFAULT_PLANS), setMode("stored");
              }}
            >
              Load
            </Button>
          </div>
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Create New</h2>
            <p className="text-sm">Start from scratch</p>
            <Button
              variant="custom"
              onClick={() => {
                setCurrentPlan(DEFAULT_PLANS), setMode("new");
              }}
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
