"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTemplates } from "@/lib/get-data";
import { SheetTypes } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { NotepadTextDashed } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingComponent from "../ifs/loading";
import { Input } from "@/components/ui/input";
import {
  useAddTemplate,
  useDeleteTemplate,
} from "@/components/hooks/use-update-templates";

const Templates = ({
  house,
  setSheetData,
  sheetData,
}: {
  house: string;
  setSheetData: Dispatch<SetStateAction<SheetTypes[]>>;
  sheetData: SheetTypes[];
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["templateList", house],
    queryFn: () => getTemplates(house),
  });
  const [templateName, setTemplateName] = useState("");
  const deleteTemplate = useDeleteTemplate();
  const addTemplate = useAddTemplate();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <NotepadTextDashed className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll h-full">
        <DialogHeader>
          <DialogTitle>Templates</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <Input
              placeholder="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Button
              variant="custom"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() =>
                addTemplate.mutate({
                  house: house,
                  templateName: templateName,
                  sheet: sheetData,
                })
              }
            >
              {data?.find((e) => e.templateName === templateName)
                ? "Update"
                : "Add"}
            </Button>
          </div>
          {isLoading ? (
            <LoadingComponent />
          ) : !data ? (
            <div>No Data</div>
          ) : (
            data.map((template) => (
              <div
                className="flex justify-between items-center border "
                key={template.templateName}
              >
                <div className="pl-2">{template.templateName}</div>
                <div className="flex items-center">
                  <Button
                    variant="custom"
                    onClick={() => {
                      setSheetData(template.sheet);
                      setTemplateName(template.templateName);
                    }}
                  >
                    Load
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      deleteTemplate.mutate({ id: template?._id ?? "" })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Templates;
