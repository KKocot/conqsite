"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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
  const [mapImage, setMapImage] = useState<string>("");
  const [planName, setPlanName] = useState<string>("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
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
      <h1 className="text-2xl font-bold mb-4">Tactical Map Editor</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[300px]">
          <Label htmlFor="map-upload">Upload Map</Label>
          <Input
            id="map-upload"
            type="file"
            accept="image/*"
            onChange={handleMapUpload}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Save size={16} />
                Save Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Tactical Plan</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="plan-name">Plan Name</Label>
                  <Input
                    id="plan-name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="Enter plan name"
                  />
                </div>
              </div>
              <Button>Save</Button>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={exportAsImage}
            className="flex items-center gap-2"
            disabled={!mapImage}
          >
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
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

        <div className="flex-1 border rounded-lg overflow-hidden">
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
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Please upload a map image to start editing
            </div>
          )}
        </div>

        <div className="w-64 border rounded-lg p-4 overflow-y-auto">
          <h3 className="font-medium mb-2">Saved Plans</h3>
          {plans.length > 0 ? (
            <ul className="space-y-2">
              {plans.map((plan) => (
                <li key={plan.id} className="border rounded p-2">
                  <p className="font-medium">{plan.name}</p>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => loadPlan(plan)}
                    >
                      Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => previewPlan(plan)}
                      title="Preview"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No saved plans yet</p>
          )}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Plan Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-2">
            {previewImage ? (
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Plan preview"
                className="max-w-full border rounded"
              />
            ) : (
              <div className="h-48 w-full flex items-center justify-center rounded">
                No preview available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
