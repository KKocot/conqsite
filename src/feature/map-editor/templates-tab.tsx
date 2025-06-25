"use client";

import { Button } from "@/components/ui/button";

import { NotepadTextDashed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Plan } from "./lib/types";
import {
  useAddMapTemplateMutation,
  useDeletePlanTemplateMutation,
} from "@/components/hooks/use-map-template-mutation";
import { getHouseAssets, getMapTemplates, HouseAssets } from "@/lib/get-data";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";

const TemplatesTab = ({
  plan,
  house,
  onPlanChange,
  onChangeCurrentPlan,
}: {
  plan: Plan[];
  house: string;
  onPlanChange: Dispatch<SetStateAction<Plan[]>>;
  onChangeCurrentPlan: Dispatch<SetStateAction<Plan>>;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["PlanTemplateList", house],
    queryFn: () => getMapTemplates(house),
  });
  const houseAssets = useQuery({
    queryKey: ["houseAssets", house],
    queryFn: () => getHouseAssets(house),
    enabled: !!house,
  });
  const [templateName, setTemplateName] = useState("");
  const handleAddTemplate = useAddMapTemplateMutation();
  const handleDeleteTemplate = useDeletePlanTemplateMutation();
  const handleSubmit = () => {
    handleAddTemplate.mutate({
      templateName: templateName,
      house: house,
      layers: plan,
    });
    if (handleAddTemplate.isSuccess) {
      existingTemplate
        ? toast.success("Template updated successfully")
        : toast.success("Template added successfully");
    }
  };

  const existingTemplate = data?.find((e) => e.templateName === templateName);

  return (
    <ScrollArea>
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <Input
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            size="sm"
            variant="custom"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            disabled={
              houseAssets.isLoading ||
              (!existingTemplate &&
                (data?.length ?? 0) >= (houseAssets.data?.premium ? 10 : 5))
            }
          >
            {existingTemplate ? "Update" : "Add"}
          </Button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : !data ? (
          <div>No Templates</div>
        ) : (
          data.map((template, i) => (
            <div className="flex justify-between items-center border" key={i}>
              <div className="pl-1">{template.templateName}</div>
              <div className="flex flex-col">
                <Button
                  className="p-1"
                  variant="custom"
                  onClick={() => {
                    onPlanChange(
                      template.layers.map((layer, index) => ({
                        ...layer,
                        index: index + 1,
                      }))
                    );
                    onChangeCurrentPlan({
                      ...template.layers[0],
                      index: 0,
                    });
                    setTemplateName(template.templateName);
                  }}
                >
                  Load
                </Button>
                <Button
                  className="p-1"
                  variant="destructive"
                  onClick={() => {
                    if (template._id) {
                      handleDeleteTemplate.mutate({
                        id: template._id,
                      });
                      toast.success("Template deleted successfully");
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default TemplatesTab;
