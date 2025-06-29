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
  getArtilleryAssets,
  getOtherIconsAssets,
  getPublicLineupDates,
  getUnitsAssets,
  PublicLineup,
} from "@/lib/get-data";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import TemplatesTab from "./templates-tab";
import MapTab from "./map-tab";
import { convertToColor } from "./lib/assets";
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
  const artillery = useQuery({
    queryKey: ["artillery"],
    queryFn: () => getArtilleryAssets(),
    enabled: true,
  });
  const otherIcons = useQuery({
    queryKey: ["otherIcons"],
    queryFn: getOtherIconsAssets,
    enabled: true,
  });
  const [unitValue, setUnitValue] = useState<string>("");
  const [otherValue, setOtherValue] = useState<string>("");
  const [artValue, setArtValue] = useState<string>("");
  return (
    <div className="flex flex-col items-center h-full">
      <Card className="h-full w-48">
        <Header values={values} onValueChange={onValueChange} />
        <Separator className="my-1" />
        <CardContent className="flex justify-center items-center p-2 flex-col gap-2">
          {values.tool === "pen" ||
          values.tool === "line" ||
          values.tool === "arrow" ||
          values.tool === "circle" ? (
            <div className="flex flex-col items-center gap-2 p-2">
              <h4 className="text-sm">Size - {values.linesSize}</h4>
              <Slider
                max={30}
                min={1}
                onValueChange={(value) =>
                  onValueChange((prev) => ({
                    ...prev,
                    size: value[0],
                  }))
                }
                value={[values.linesSize]}
                step={1}
                className="w-44"
              />
            </div>
          ) : null}
          {values.tool === "unitIcon" ||
          values.tool === "otherIcon" ||
          values.tool === "artilleryIcon" ? (
            <div className="flex flex-col items-center gap-2 p-2">
              <h4 className="text-sm">Size - {values.iconsSize}</h4>
              <Slider
                max={30}
                min={1}
                onValueChange={(value) =>
                  onValueChange((prev) => ({
                    ...prev,
                    size: value[0],
                  }))
                }
                value={[values.iconsSize]}
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
            <>
              <Input
                type="text"
                placeholder="Search Unit"
                value={unitValue}
                onChange={(e) => setUnitValue(e.target.value)}
              />
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
                      .filter((unit) =>
                        unit.toLowerCase().includes(unitValue.toLowerCase())
                      )

                      .map((unit) => (
                        <div
                          key={unit}
                          className={clsx(
                            "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                            {
                              "bg-accent text-background":
                                values.unitIconValue === unit,
                            }
                          )}
                          onClick={() =>
                            onValueChange((prev) => ({
                              ...prev,
                              unitIconValue: unit,
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
            </>
          ) : null}
          {values.tool === "artilleryIcon" ? (
            <>
              <Input
                type="text"
                placeholder="Search Artillery"
                value={artValue}
                onChange={(e) => setArtValue(e.target.value)}
              />
              <ScrollArea className="w-full h-[480px]">
                <div>
                  {artillery.isLoading ? (
                    <div>Loading...</div>
                  ) : !artillery.data ? (
                    <div>No Artillery Assets</div>
                  ) : (
                    artillery.data
                      .map((a) => a.name)
                      .filter((e) =>
                        e.toLowerCase().includes(artValue.toLowerCase())
                      )
                      .map((art) => (
                        <div
                          key={art}
                          className={clsx(
                            "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                            {
                              "bg-accent text-background":
                                values.artyIconValue === art,
                            }
                          )}
                          onClick={() =>
                            onValueChange((prev) => ({
                              ...prev,
                              artyIconValue: art,
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
                      ))
                  )}
                </div>
              </ScrollArea>
            </>
          ) : null}
          {values.tool === "otherIcon" ? (
            <>
              <Input
                type="text"
                placeholder="Search..."
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
              />
              <ScrollArea className="w-full h-[480px]">
                <div>
                  {otherIcons.isLoading ? (
                    <div>Loading...</div>
                  ) : !otherIcons.data ? (
                    <div>No Other Icons Assets</div>
                  ) : (
                    otherIcons.data
                      .filter((e) =>
                        e.name.toLowerCase().includes(otherValue.toLowerCase())
                      )
                      .map((icon) => (
                        <div
                          key={icon.name}
                          className={clsx(
                            "flex items-center gap-2 text-xs mb-1 cursor-pointer",
                            {
                              "bg-accent text-background":
                                values.otherIconValue === icon.name,
                            }
                          )}
                          onClick={() =>
                            onValueChange((prev) => ({
                              ...prev,
                              otherIconValue: icon.name,
                            }))
                          }
                        >
                          <div className="w-8 h-8">
                            <Image
                              src={`${
                                process.env.NEXT_PUBLIC_IMAGES_IP_HOST
                              }/images/other-icons/${icon.name
                                .toLowerCase()
                                .replace(/[ ':]/g, "-")}.png`}
                              alt={icon.name}
                              width={32}
                              height={32}
                            />
                          </div>
                          {icon.name}
                        </div>
                      ))
                  )}
                </div>
              </ScrollArea>
            </>
          ) : null}
          {values.tool === "delete" ? (
            <div>
              <Button variant="destructive" onClick={onCleanMap}>
                Clean Map
              </Button>
            </div>
          ) : null}
          {values.tool === "tooltip" ? (
            <>
              <div className="flex gap-1">
                <span
                  className={clsx("border-2 rounded px-2 py-1 cursor-pointer", {
                    "border-accent": values.tooltipSize === 1,
                  })}
                  onClick={() =>
                    onValueChange((prev) => ({ ...prev, tooltipSize: 1 }))
                  }
                >
                  sm
                </span>
                <span
                  className={clsx("border-2 rounded px-2 py-1 cursor-pointer", {
                    "border-accent": values.tooltipSize === 2,
                  })}
                  onClick={() =>
                    onValueChange((prev) => ({ ...prev, tooltipSize: 2 }))
                  }
                >
                  md
                </span>
                <span
                  className={clsx("border-2 rounded px-2 py-1 cursor-pointer", {
                    "border-accent": values.tooltipSize === 3,
                  })}
                  onClick={() =>
                    onValueChange((prev) => ({ ...prev, tooltipSize: 3 }))
                  }
                >
                  lg
                </span>
                <span
                  className={clsx("border-2 rounded px-2 py-1 cursor-pointer", {
                    "border-accent": values.tooltipSize === 4,
                  })}
                  onClick={() =>
                    onValueChange((prev) => ({ ...prev, tooltipSize: 4 }))
                  }
                >
                  xl
                </span>
              </div>
              <ScrollArea className="w-full h-[530px] scroll-m-0">
                {dates.isLoading ? (
                  <div>Loading...</div>
                ) : !dates.data ? (
                  <div>No Data</div>
                ) : (
                  <>
                    <ul>
                      {lineup
                        ? lineup.sheet
                            .filter((el) => el.username !== "")
                            .map((e, i) => (
                              <li
                                className={clsx(
                                  `border-2 bg-gradient-to-t from${e.color} p-1 cursor-pointer hover:bg-opacity-80`,
                                  {
                                    "border-accent":
                                      values.tooltipValue === e.username,
                                  }
                                )}
                                key={i}
                                onClick={() =>
                                  onValueChange((prev) => ({
                                    ...prev,
                                    tooltipValue: e.username,
                                    toolColor: convertToColor(e.color),
                                  }))
                                }
                              >
                                <span className="underline text-lg">{`${
                                  i + 1
                                } ${e.username}`}</span>
                                <div className="flex items-center gap-2">
                                  {e.unit1 !== "" ? (
                                    <span className="h-8 w-8">
                                      <ImageComponent name={e.unit1} />
                                    </span>
                                  ) : null}
                                  {e.unit2 !== "" ? (
                                    <span className="h-8 w-8">
                                      <ImageComponent name={e.unit2} />
                                    </span>
                                  ) : null}
                                  {e.unit3 !== "" ? (
                                    <span className="h-8 w-8">
                                      <ImageComponent name={e.unit3} />
                                    </span>
                                  ) : null}
                                  {e.weapon !== "" ? (
                                    <span className="h-8 w-8">
                                      <ImageComponent
                                        className="rounded-full"
                                        name={e.weapon}
                                        type="weapon"
                                      />
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
            </>
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
                  <div className="text-sm border-2 border-accent p-2">
                    <h2 className="text-center">Sheet:</h2>
                    <span>
                      {lineup.name} - {lineup.date}
                    </span>
                  </div>
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
