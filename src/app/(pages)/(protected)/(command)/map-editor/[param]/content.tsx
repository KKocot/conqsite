"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Toolbar } from "@/feature/map-editor/toolbar";
import { MapEditor } from "@/feature/map-editor/editor";
import { MapEditorRef, Plan } from "@/feature/map-editor/types";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ArtilleryAsset,
  getPublicLineup,
  PublicLineup,
  UnitAssetsGroup,
} from "@/lib/get-data";

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
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [mapImage, setMapImage] = useState<string>("");
  const [planName, setPlanName] = useState<string>("");
  const [gridEnabled, setGridEnabled] = useState<boolean>(false);
  const [gridSize, setGridSize] = useState<number>(20);
  const [selectedFontSize, setSelectedFontSize] = useState<number>(16);
  const [selectedIconType, setSelectedIconType] = useState<string>("");
  const [currentPlanId, setCurrentPlanId] = useState<string | undefined>(
    undefined
  );
  const editorRef = useRef<MapEditorRef>(null);
  const [lineupSheets, setLineupSheets] = useState<PublicLineup[] | null>(null);
  const [currentLineup, setCurrentLineup] = useState<PublicLineup | null>(null);
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
  const loadPlan = (plan: Plan) => {
    if (editorRef.current) {
      setMapImage(plan.mapImage);
      editorRef.current.loadMapData(plan.elements);
      setPlanName(plan.name);
      setCurrentPlanId(plan.id);

      // Set grid settings if available
      if (plan.elements.gridEnabled !== undefined) {
        setGridEnabled(plan.elements.gridEnabled);
      }
      if (plan.elements.gridSize !== undefined) {
        setGridSize(plan.elements.gridSize);
      }
    }
  };
  const handleClearAll = () => {
    if (editorRef.current) {
      if (confirm("Are you sure you want to clear all elements?")) {
        editorRef.current.clearAll();
      }
    }
  };

  const handleDeleteSelected = () => {
    if (editorRef.current) {
      editorRef.current.deleteSelected();
    }
  };

  const handleSetCurrentLineup = (lineup: PublicLineup) => {
    setCurrentLineup(lineup);
  };

  const onDateChange = async (date: string) => {
    try {
      const response = await getPublicLineup(house, date);
      if (!response) {
        console.error("Error occurred:", response);
      } else {
        setLineupSheets(response);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Tactical Map Editor
      </h1>
      <div className="flex justify-center gap-2 overflow-hidden">
        {mapImage ? (
          <MapEditor
            ref={editorRef}
            mapImage={mapImage}
            tool={selectedTool}
            color={selectedColor}
            strokeWidth={strokeWidth}
            gridEnabled={gridEnabled}
            gridSize={gridSize}
            fontSize={selectedFontSize}
            unitAssets={unitsAssets.data}
          />
        ) : (
          <div className="flex items-center justify-center w-[750px] h-[750px] border-2 border-dashed rounded-lg">
            <p>No map selected</p>
          </div>
        )}

        <Toolbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          onClearAll={handleClearAll}
          onDeleteSelected={handleDeleteSelected}
          gridEnabled={gridEnabled}
          setGridEnabled={setGridEnabled}
          gridSize={gridSize}
          setGridSize={setGridSize}
          selectedFontSize={selectedFontSize}
          setSelectedFontSize={setSelectedFontSize}
          selectedIconType={selectedIconType}
          setSelectedIconType={setSelectedIconType}
          selectedMapImage={mapImage}
          setSelectedMapImage={setMapImage}
          dates={dates}
          onDateChange={onDateChange}
          lineupSheets={lineupSheets}
          currentLineup={currentLineup}
          setCurrentLineup={handleSetCurrentLineup}
          unitsAssetsList={unitsAssetsList}
          artAssets={artAssets}
        />
      </div>
    </div>
  );
}
