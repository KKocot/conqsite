import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Plan, ToolsConfig } from "./lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import Header from "./header";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import ImageComponent from "@/components/image-component";
import { Button } from "@/components/ui/button";
import {
  getPublicLineupDates,
  getUnitsAssets,
  PublicLineup,
} from "@/lib/get-data";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import TemplatesTab from "./templates-tab";
import MapTab from "./map-tab";
import { artillery } from "./lib/assets";
import LineupLoader from "./lineup-loader";
import { useAddMapPublicMutation } from "@/components/hooks/use-plan-public-mutation";
import { toast } from "react-toastify";

const ToolbarMenu = ({
  values,
  onValueChange,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  onCleanMap,
  house,
  plan,
  onPlanChange,
  onChangeCurrentPlan,
  map,
  lineup,
  onChangeLineup,
}: {
  values: ToolsConfig;
  onValueChange: Dispatch<SetStateAction<ToolsConfig>>;
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  onCleanMap: () => void;
  house: string;
  plan: Plan[];
  onPlanChange: Dispatch<SetStateAction<Plan[]>>;
  onChangeCurrentPlan: Dispatch<SetStateAction<Plan>>;
  map: string;
  lineup: PublicLineup | undefined;
  onChangeLineup: (lineup: PublicLineup | undefined) => void;
}) => {
  const addMapPublicMutation = useAddMapPublicMutation();
  const unitsAssets = useQuery({
    queryKey: ["unitsAssets"],
    queryFn: getUnitsAssets,
    enabled: true,
  });
  const dates = useQuery({
    queryKey: ["lineupsDates", house],
    queryFn: () => getPublicLineupDates(house),
    enabled: !!house,
  });

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
                {unitsAssets.isLoading ? (
                  <div>Loading...</div>
                ) : !unitsAssets.data ? (
                  <div>No Unit Assets</div>
                ) : (
                  [
                    ...unitsAssets.data.goldenEra,
                    ...unitsAssets.data.otherEra,
                    ...unitsAssets.data.heroicEra,
                    ...unitsAssets.data.blueEra,
                    ...unitsAssets.data.greenEra,
                    ...unitsAssets.data.greyEra,
                  ]
                    .map((unit) => unit.name)
                    .map((unit) => (
                      <div
                        key={unit}
                        className={clsx(
                          "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                          {
                            "bg-accent text-background":
                              values.iconValue === unit,
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
                          <ImageComponent name={unit} />
                        </div>
                        {unit}
                      </div>
                    ))
                )}
              </div>
            </ScrollArea>
          ) : null}
          {values.tool === "artilleryIcon" ? (
            <ScrollArea className="w-full h-[480px]">
              <div>
                {artillery.map((art) => (
                  <div
                    key={art}
                    className={clsx(
                      "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                      {
                        "bg-accent text-background": values.iconValue === art,
                      }
                    )}
                    onClick={() =>
                      onValueChange((prev) => ({
                        ...prev,
                        iconValue: art,
                      }))
                    }
                  >
                    <div className="w-8 h-8">
                      <Image
                        src={`${
                          process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                        }/images/artillery/${art
                          .toLowerCase()
                          .replace(/[ ':]/g, "-")}.png`}
                        alt={art}
                        width={32}
                        height={32}
                      />
                    </div>
                    {art}
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
          {values.tool === "tooltip" ? (
            <ScrollArea className="w-full h-[530px]">
              {dates.isLoading ? (
                <div>Loading...</div>
              ) : !dates.data ? (
                <div>No Data</div>
              ) : (
                <>
                  <ul>
                    {lineup
                      ? lineup.sheet.map((e, i) => (
                          <li
                            className={`border-2 p-1 border${e.color}`}
                            key={i}
                          >
                            <span className="underline text-lg">{`${i + 1} ${
                              e.username
                            }`}</span>
                            <div className="flex items-center justify-around">
                              {e.unit1 !== "" ? (
                                <span>
                                  <ImageComponent name={e.unit1} />
                                </span>
                              ) : null}
                              {e.unit2 !== "" ? (
                                <span>
                                  <ImageComponent name={e.unit2} />
                                </span>
                              ) : null}
                              {e.unit3 !== "" ? (
                                <span>
                                  <ImageComponent name={e.unit3} />
                                </span>
                              ) : null}
                            </div>
                          </li>
                        ))
                      : null}
                  </ul>
                  <LineupLoader
                    dates={dates.data}
                    house={house}
                    lineup={lineup}
                    onLineupChange={(lineup) => onChangeLineup(lineup)}
                  />
                </>
              )}
            </ScrollArea>
          ) : null}
          {values.tool === "templates" ? (
            <TemplatesTab
              plan={plan}
              house={house}
              onPlanChange={onPlanChange}
              onChangeCurrentPlan={onChangeCurrentPlan}
            />
          ) : null}
          {values.tool === "map" ? (
            <MapTab
              value={map}
              onChange={(map) =>
                onChangeCurrentPlan((prev) => ({ ...prev, map: map }))
              }
            />
          ) : null}
          {values.tool === "public" ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-sm">Connect with Public Lineup</h4>
                {dates.isLoading ? (
                  <div>Loading...</div>
                ) : !!dates.data ? (
                  <LineupLoader
                    dates={dates.data}
                    house={house}
                    lineup={lineup}
                    onLineupChange={(lineup) => onChangeLineup(lineup)}
                  />
                ) : null}
                {lineup ? (
                  <>
                    <Input
                      type="text"
                      placeholder="Enter House Name"
                      value={`${lineup.name} - ${lineup.date}`}
                      className="w-full h-8 p-1 border rounded"
                    />
                  </>
                ) : (
                  <div>No Lineup Data Available</div>
                )}
              </div>
              <Button
                variant="custom"
                className="w-full"
                disabled={!lineup || addMapPublicMutation.isPending}
                onClick={() => {
                  if (!lineup) {
                    toast.error("Please select a lineup first.");
                    return;
                  }
                  addMapPublicMutation.mutate({
                    publicName: lineup.name,
                    house: house,
                    layers: plan,
                  });
                  if (addMapPublicMutation.isSuccess) {
                    toast.success("Map connected successfully!");
                  }
                }}
              >
                Connect
              </Button>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
export default ToolbarMenu;
