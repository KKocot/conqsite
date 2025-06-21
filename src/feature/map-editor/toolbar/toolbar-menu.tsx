import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToolsConfig } from "../lib/types";
import { Dispatch, SetStateAction } from "react";
import Header from "./header";
import { Textarea } from "@/components/ui/textarea";

const ToolbarMenu = ({
  values,
  onValueChange,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
}: {
  values: ToolsConfig;
  onValueChange: Dispatch<SetStateAction<ToolsConfig>>;
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
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
            <div className="flex flex-col items-center gap-2">
              <h4 className="text-sm">Brush Size</h4>
              <Slider
                defaultValue={[50]}
                max={100}
                min={0}
                step={1}
                className="w-48"
              />
            </div>
          ) : null}
          {values.tool === "pen" ||
          values.tool === "line" ||
          values.tool === "arrow" ||
          values.tool === "circle" ? (
            <div className="flex flex-wrap justify-center items-center gap-1 w-full">
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-2 cursor-pointer hover:bg-accent hover:text-background"
                >
                  <div className="h-6 w-6 bg-red-400 rounded-full" />
                </div>
              ))}
              <Input type="color" className="w-full h-8 p-1 border rounded" />
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
        </CardContent>
      </Card>
    </div>
  );
};
export default ToolbarMenu;
