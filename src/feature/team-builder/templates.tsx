"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTemplates, HouseAssets } from "@/lib/get-data";
import { SheetTypes } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { NotepadTextDashed } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingComponent from "../ifs/loading";
import { Input } from "@/components/ui/input";
import {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
} from "@/components/hooks/use-templates-mutation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

const Templates = ({
  house,
  setSheetData,
  sheetData,
  commander,
  assets,
  setCommander,
}: {
  house: string;
  setSheetData: Dispatch<SetStateAction<SheetTypes[]>>;
  setCommander: Dispatch<SetStateAction<string>>;
  sheetData: SheetTypes[];
  commander: string;
  assets?: HouseAssets;
}) => {
  const t = useTranslations("BuildTeam.templates");
  const { data, isLoading } = useQuery({
    queryKey: ["templateList", house],
    queryFn: () => getTemplates(house),
  });
  const [templateName, setTemplateName] = useState("");
  const deleteTemplate = useDeleteTemplateMutation();
  const addTemplate = useAddTemplateMutation();
  const existingTemplate = data?.find((e) => e.templateName === templateName);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full flex items-center justify-center p-3 cursor-pointer hover:bg-accent hover:text-background">
          <NotepadTextDashed className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{t("templates")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <Input
              placeholder={t("template_name")}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Button
              size="sm"
              variant="custom"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              disabled={
                !existingTemplate &&
                (data?.length ?? 0) >= (assets?.premium ? 10 : 5)
              }
              onClick={() => {
                addTemplate.mutate({
                  house: house,
                  commander: commander,
                  templateName: templateName,
                  sheet: sheetData,
                });
                existingTemplate
                  ? toast.success(t("template_updated"))
                  : toast.success(t("template_added"));
              }}
            >
              {existingTemplate ? t("update") : t("add")}
            </Button>
          </div>
          {isLoading ? (
            <LoadingComponent />
          ) : !data ? (
            <div>{t("no_templates")}</div>
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
                      setCommander(template.commander ?? "");
                      toast.success(t("template_loaded"));
                    }}
                  >
                    {t("load")}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteTemplate.mutate({ id: template?._id ?? "" });
                      toast.success(t("template_deleted"));
                    }}
                  >
                    {t("delete")}
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
