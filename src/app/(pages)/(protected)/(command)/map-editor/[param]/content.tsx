"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Download, Save, Eye } from "lucide-react";
import { Toolbar } from "@/feature/map-editor/toolbar";
import { MapEditor } from "@/feature/map-editor/editor";
import { MapEditorRef, Plan } from "@/feature/map-editor/types";

export default function TacticalMapPage() {
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [mapImage, setMapImage] = useState<string>("/maps/1-1.jpg");
  const [planName, setPlanName] = useState<string>("");
  const [gridEnabled, setGridEnabled] = useState<boolean>(false);
  const [gridSize, setGridSize] = useState<number>(20);
  const [selectedFontSize, setSelectedFontSize] = useState<number>(16);
  const [selectedIconType, setSelectedIconType] = useState<string>("infantry");
  const [currentPlanId, setCurrentPlanId] = useState<string | undefined>(
    undefined
  );
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const editorRef = useRef<MapEditorRef>(null);

  const handleMapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMapImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const exportAsImage = () => {
    if (!editorRef.current) return;
    const dataURL = editorRef.current.getDataURL();
    const link = document.createElement("a");
    link.download = `${planName || "tactical-map"}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const previewPlan = (plan: Plan) => {
    setPreviewImage(plan.thumbnail || "");
    setShowPreview(true);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Tactical Map Editor
      </h1>
      <div className="flex justify-center gap-2 overflow-hidden">
        <MapEditor
          ref={editorRef}
          mapImage={mapImage}
          tool={selectedTool}
          color={selectedColor}
          strokeWidth={strokeWidth}
          gridEnabled={gridEnabled}
          gridSize={gridSize}
          fontSize={selectedFontSize}
        />
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
        />
      </div>
    </div>
  );
}
