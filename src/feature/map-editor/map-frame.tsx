"use client";

import {
  ArtilleryAsset,
  getPublicLineup,
  PublicLineup,
  UnitAssetsGroup,
} from "@/lib/get-data";
import { RefObject, useState } from "react";
import { MapEditorRef } from "./types";
import { MapEditor } from "./editor";
import { Toolbar } from "./toolbar";
import { UseQueryResult } from "@tanstack/react-query";

const MapFrame = ({
  editorRef,
  house,
  unitsAssetsList,
  unitAssets,
  dates,
  artAssets,
}: {
  editorRef: RefObject<MapEditorRef>;
  house: string;
  unitsAssetsList: { name: string; icon: string }[];
  unitAssets?: UnitAssetsGroup;
  dates: UseQueryResult<string[], Error>;
  artAssets: UseQueryResult<ArtilleryAsset[], Error>;
}) => {
  const [selectedTool, setSelectedTool] = useState<string>("map");
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [mapImage, setMapImage] = useState<string>("");
  const [gridEnabled, setGridEnabled] = useState<boolean>(false);
  const [gridSize, setGridSize] = useState<number>(20);
  const [selectedFontSize, setSelectedFontSize] = useState<number>(16);
  const [selectedIconType, setSelectedIconType] = useState<string>("");
  const [lineupSheets, setLineupSheets] = useState<PublicLineup[] | null>(null);
  const [currentLineup, setCurrentLineup] = useState<PublicLineup | null>(null);

  const handleClearAll = () => {
    if (editorRef.current) {
      if (confirm("Are you sure you want to clear all elements?")) {
        editorRef.current.clearAll();
      }
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
          unitAssets={unitAssets}
        />
      ) : (
        <div className="flex items-center justify-center w-[750px] h-[750px] border-2 border-dashed rounded-lg">
          <p>No map selected</p>
        </div>
      )}
      <Toolbar
        unitsAssetsList={unitsAssetsList}
        house={house}
        dates={dates.data}
        artAssets={artAssets.data}
      />
    </div>
  );
};
export default MapFrame;
