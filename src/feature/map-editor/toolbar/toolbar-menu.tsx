import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToolsConfig } from "../lib/types";
import { Dispatch, SetStateAction } from "react";
import Header from "./header";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import UnitIcon from "@/components/unit-icon";
import { Button } from "@/components/ui/button";
import { ArtilleryAsset } from "@/lib/get-data";
import Image from "next/image";

const ToolbarMenu = ({
  values,
  onValueChange,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  units,
  onCleanMap,
  artillery,
}: {
  values: ToolsConfig;
  onValueChange: Dispatch<SetStateAction<ToolsConfig>>;
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  units: string[];
  onCleanMap: () => void;
  artillery: ArtilleryAsset[];
}) => {
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-center">Toolbar</h2>
      <Card className="h-full w-48">
        <Header values={values} onValueChange={onValueChange} />
        <Separator className="my-1" />
        <CardContent className="flex justify-center items-center p-2 flex-col gap-2">
          {values.tool === "pen" ||
          values.tool === "line" ||
          values.tool === "arrow" ||
          values.tool === "unitIcon" ||
          values.tool === "artilleryIcon" ? (
            <div className="flex flex-col items-center gap-2 p-2">
              <h4 className="text-sm">Size - {values.size}</h4>
              <Slider
                max={100}
                min={1}
                onValueChange={(value) =>
                  onValueChange((prev) => ({
                    ...prev,
                    size: value[0],
                  }))
                }
                value={[values.size]}
                step={1}
                className="w-44"
              />
            </div>
          ) : null}
          {values.tool === "pen" ||
          values.tool === "line" ||
          values.tool === "arrow" ||
          values.tool === "circle" ? (
            <div className="flex flex-wrap justify-center items-center gap-3 w-full">
              {[
                "ff0000",
                "00ff00",
                "0000ff",
                "ffff00",
                "ff00ff",
                "00ffff",
                "800000",
                "008000",
              ].map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    onValueChange((prev) => ({
                      ...prev,
                      toolColor: `#${color}`,
                    }))
                  }
                  className={clsx(
                    "flex items-center justify-center cursor-pointer border-2 rounded-full",
                    {
                      "border-accent": values.toolColor === `#${color}`,
                    }
                  )}
                >
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{
                      backgroundColor: `#${color}`,
                    }}
                  />
                </div>
              ))}
              <Input
                type="color"
                className="w-full h-8 p-1 border rounded"
                value={values.toolColor}
                onChange={(e) =>
                  onValueChange((prev) => ({
                    ...prev,
                    toolColor: e.target.value,
                  }))
                }
              />
            </div>
          ) : null}
          {values.tool === "text" ? (
            <div>
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Title"
                className="w-full h-8 p-1 border rounded"
              />
              <Textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Description"
                className="w-full h-24 p-1 border rounded mt-2"
              />
            </div>
          ) : null}
          {values.tool === "unitIcon" ? (
            <ScrollArea className="w-full h-[480px]">
              <div>
                {units.map((unit) => (
                  <div
                    key={unit}
                    className={clsx(
                      "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                      {
                        "bg-accent text-background": values.iconValue === unit,
                      }
                    )}
                    onClick={() =>
                      onValueChange((prev) => ({
                        ...prev,
                        iconValue: unit,
                      }))
                    }
                  >
                    <div className="w-8 h-8">
                      <UnitIcon unitName={unit} />
                    </div>
                    {unit}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : null}
          {values.tool === "artilleryIcon" ? (
            <ScrollArea className="w-full h-[480px]">
              <div>
                {artillery.map((art) => (
                  <div
                    key={art.name}
                    className={clsx(
                      "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                      {
                        "bg-accent text-background":
                          values.iconValue === art.src,
                      }
                    )}
                    onClick={() =>
                      onValueChange((prev) => ({
                        ...prev,
                        iconValue: art.src,
                      }))
                    }
                  >
                    <div className="w-8 h-8">
                      <Image
                        src={art.src}
                        alt={art.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    {art.name}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : null}
          {values.tool === "delete" ? (
            <div>
              <Button variant="destructive" onClick={onCleanMap}>
                Clean Map
              </Button>
            </div>
          ) : null}
          {values.tool === "tooltip" ? <div>Not supported yet</div> : null}
        </CardContent>
      </Card>
    </div>
  );
};
export default ToolbarMenu;
