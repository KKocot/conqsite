"use client";

import {
  ArtilleryAsset,
  getPublicLineup,
  PublicLineup,
  UnitAssetsGroup,
} from "@/lib/get-data";
import { RefObject, useState } from "react";
import { MapEditorRef, ToolbarState } from "./types";
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
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    map: "/maps/fort1.jpg",
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

  const handleClearAll = () => {
    if (editorRef.current) {
      if (confirm("Are you sure you want to clear all elements?")) {
        editorRef.current.clearAll();
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 overflow-hidden">
      {toolbarState.map ? (
        <MapEditor
          ref={editorRef}
          map={toolbarState.map}
          lineup={toolbarState.lineup}
          currentTool={toolbarState.currentTool}
          iconValue={toolbarState.iconValue}
          toolColor={toolbarState.toolColor}
          strokeWidth={toolbarState.strokeWidth}
          selectedFontSize={toolbarState.selectedFontSize}
          tool={toolbarState.currentTool}
          color={toolbarState.toolColor}
        />
      ) : (
        <div className="flex items-center justify-center w-[750px] h-[750px] border-2 border-dashed rounded-lg">
          <p>No map selected</p>
        </div>
      )}
      <Toolbar
        handleClearAll={handleClearAll}
        setToolbarState={setToolbarState}
        toolbarState={toolbarState}
        unitsAssetsList={unitsAssetsList}
        house={house}
        dates={dates.data}
        artAssets={artAssets.data}
      />
    </div>
  );
};
export default MapFrame;
