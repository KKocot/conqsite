"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { MapData, MapEditorRef } from "@/feature/map-editor/types";
import { UseQueryResult } from "@tanstack/react-query";
import { ArtilleryAsset, UnitAssetsGroup } from "@/lib/get-data";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "usehooks-ts";
import MapFrame from "@/feature/map-editor/map-frame";
import { ArrowBigLeftDashIcon } from "lucide-react";
import clsx from "clsx";

export default function TacticalMapPage({
  dates,
  house,
  unitsAssets,
  artAssets,
}: {
  dates: UseQueryResult<string[], Error>;
  house: string;
  unitsAssets: UseQueryResult<UnitAssetsGroup, Error>;
  artAssets: UseQueryResult<ArtilleryAsset[], Error>;
}) {
  const editorRef = useRef<MapEditorRef>(null);
  const [storedPlan, setStoredPlan] = useLocalStorage<MapData | undefined>(
    "tactical-map-plan",
    undefined
  );
  const [loadedPlan, setLoadedPlan] = useState<boolean>(false);

  const onLoadPlan = (plan?: MapData) => {
    if (editorRef.current && plan) {
      editorRef.current.loadMapData(plan);
    }
    setLoadedPlan(true);
  };

  const unitsAssetsList = !!unitsAssets.data
    ? [
        ...unitsAssets.data?.goldenEra,
        ...unitsAssets.data?.heroicEra,
        ...unitsAssets.data?.blueEra,
        ...unitsAssets.data?.greenEra,
        ...unitsAssets.data?.greyEra,
        ...unitsAssets.data?.otherEra,
      ].map((unit) => ({
        name: unit.name,
        icon: unit.icon,
      }))
    : [];

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setLoadedPlan(false)}
          variant="ghost"
          className={clsx("rounded-full", {
            "opacity-50 cursor-not-allowed": !loadedPlan,
          })}
        >
          <ArrowBigLeftDashIcon />
        </Button>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Tactical Map Editor
        </h1>
        <div className="w-14" />
      </div>

      {loadedPlan ? (
        <MapFrame
          editorRef={editorRef}
          house={house}
          unitsAssetsList={unitsAssetsList}
          dates={dates}
          artAssets={artAssets}
        />
      ) : (
        <div className="flex justify-evenly">
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Load Template</h2>
            <p className="text-sm">Use an existing map template</p>
            {[...Array(5)].map((_, i) => (
              <Button key={i} variant="custom">
                Templates Name {i + 1}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Load Public Lineup</h2>
            <p className="text-sm">Import from public lineup</p>
            {[...Array(5)].map((_, i) => (
              <Button key={i} variant="custom">
                Public Lineup Name {i + 1}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Continue</h2>
            <p className="text-sm">Resume previous work</p>
            <Button
              variant="custom"
              disabled={!storedPlan}
              onClick={() => onLoadPlan(storedPlan)}
            >
              Load
            </Button>
          </div>
          <div className="flex flex-col gap-4 mr-4 text-center">
            <h2 className="text-xl font-semibold">Create New</h2>
            <p className="text-sm">Start from scratch</p>
            <Button variant="custom" onClick={() => onLoadPlan()}>
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
