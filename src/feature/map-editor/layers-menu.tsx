"use client";

import {
  ArrowBigDown,
  ArrowBigUp,
  FolderDown,
  PlusCircle,
  Trash,
} from "lucide-react";
import { Plan } from "./lib/types";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { DEFAULT_PLAN } from "./lib/assets";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";

const LayersMenu = ({
  layers,
  onLayerChange,
  currentLayer,
  onCurrentLayerChange,
}: {
  layers: Plan[];
  onLayerChange: Dispatch<SetStateAction<Plan[]>>;
  currentLayer: Plan;
  onCurrentLayerChange: (layer: Plan) => void;
}) => {
  return (
    <div>
      <h2 className="text-center">Layers Menu</h2>
      <ul className="max-h-[670px] overflow-y-auto">
        {layers.map((layer, index) => (
          <Card
            key={index}
            className={clsx("flex flex-col justify-between border-2", {
              "border-accent": layer.index === currentLayer.index,
            })}
          >
            <CardHeader
              className="p-2 text-center cursor-pointer"
              onClick={() => {
                onCurrentLayerChange(layer);
              }}
            >
              {layer.title !== "" ? layer.title : `Layer ${layer.index}`}
            </CardHeader>
            <CardContent className="flex items-center p-0">
              <Button
                disabled={layers.length <= 1}
                className="p-0 w-8 bg-transparent text-destructive hover:bg-destructive hover:text-black"
                onClick={() => {
                  onLayerChange((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Button
                className="p-0 w-8 bg-transparent"
                disabled={index === layers.length - 1}
                onClick={() => {
                  onLayerChange((prev) => {
                    const newLayers = [...prev];
                    const currentIndex = newLayers.findIndex(
                      (l) => l.index === layer.index
                    );
                    if (currentIndex < newLayers.length - 1) {
                      [newLayers[currentIndex + 1], newLayers[currentIndex]] = [
                        newLayers[currentIndex],
                        newLayers[currentIndex + 1],
                      ];
                    }
                    return newLayers;
                  });
                }}
              >
                <ArrowBigDown className="h-4 w-4" />
              </Button>
              <Button
                className="p-0 w-8 bg-transparent"
                disabled={index === 0}
                onClick={() => {
                  onLayerChange((prev) => {
                    const newLayers = [...prev];
                    const currentIndex = newLayers.findIndex(
                      (l) => l.index === layer.index
                    );
                    if (currentIndex > 0) {
                      [newLayers[currentIndex - 1], newLayers[currentIndex]] = [
                        newLayers[currentIndex],
                        newLayers[currentIndex - 1],
                      ];
                    }
                    return newLayers;
                  });
                }}
              >
                <ArrowBigUp className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </ul>
      <Button
        variant="custom"
        className="mt-2 w-full"
        onClick={() => {
          onLayerChange((prev) => [
            ...prev,
            {
              ...DEFAULT_PLAN,
              map: currentLayer.map,
              index: prev[prev.length - 1].index + 1,
            },
          ]);
        }}
      >
        <PlusCircle className="h-6 w-6 cursor-pointer" />
      </Button>
    </div>
  );
};
export default LayersMenu;
