import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetTypes } from "@/lib/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { Send } from "lucide-react";
import { getPublicLineup, PublicLineup } from "@/lib/get-data";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useAddLineupMutation } from "@/components/hooks/use-lineups-mutation";
import useDeleteSheetMutation from "@/components/hooks/use-sheet-mutation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function PublicDialog({
  data,
  house,
  dates,
  commander,
  setSheetData,
}: {
  data: SheetTypes[];
  house: string;
  dates?: string[];
  commander?: string;
  setSheetData: Dispatch<SetStateAction<SheetTypes[]>>;
}) {
  const t = useTranslations("BuildTeam.public");
  const [publicationName, setPublicationName] = useState("");
  const [date, setDate] = useState<string>(dates ? dates[0] : "");
  const [publicLineup, setPublicLineup] = useState<PublicLineup[]>([]);
  const deleteSheetMutation = useDeleteSheetMutation();
  const updateLineup = useAddLineupMutation();
  const onDateChange = async (date: string) => {
    try {
      const response = await getPublicLineup(house, date);
      if (!response) {
        console.error("Error occurred:", response);
      } else {
        setPublicLineup(response);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    if (date || updateLineup.isSuccess || deleteSheetMutation.isSuccess) {
      onDateChange(date);
    }
  }, [
    date,
    updateLineup.isSuccess,
    updateLineup.isPending,
    deleteSheetMutation.isSuccess,
    deleteSheetMutation.isPending,
  ]);
  const existingLineup = publicLineup.find((e) => e.name === publicationName);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Send className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              <h1>{t("public")}</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="custom">
                    {date ?? t("no_lineups")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50">
                  <div className="flex flex-col gap-2 bg-secondary p-6">
                    {dates
                      ? dates.map((e) => (
                          <Button
                            variant="custom"
                            key={e}
                            onClick={() => {
                              setDate(e);
                              toast.success(t("date_loaded"));
                            }}
                          >
                            {e}
                          </Button>
                        ))
                      : null}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1>
              {t("lineups_from")}
              {date}
            </h1>
            <div className="flex flex-col gap-2 w-64">
              {publicLineup.map((e) => (
                <div key={e.name} className="flex items-center justify-between">
                  <h2>{e.name}</h2>
                  <div className="flex items-center">
                    <Button
                      variant="custom"
                      size="xs"
                      onClick={() => {
                        setPublicationName(e.name);
                        setSheetData(e.sheet);
                        toast.success(t("lineup_loaded"));
                      }}
                    >
                      {t("load")}
                    </Button>
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => {
                        const confirmed = confirm(t("are_you_sure"));
                        if (confirmed) {
                          deleteSheetMutation.mutate({
                            house,
                            date: e.date,
                            name: e.name,
                          });
                          toast.success(t("lineup_deleted"));
                        }
                      }}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <Label htmlFor="name" className="text-right">
              {t("lineup_name")}
            </Label>
            <div className="relative w-full">
              <Input
                id="name"
                placeholder={t("lineup_name")}
                value={publicationName}
                onChange={(e) => setPublicationName(e.target.value)}
                className="col-span-3"
              />
              <Button
                variant="custom"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                disabled={publicationName === ""}
                onClick={() => {
                  updateLineup.mutate({
                    name: publicationName,
                    house: house,
                    date: date,
                    sheet: data,
                    commander: commander ?? "",
                  });
                  toast.success(
                    existingLineup ? t("lineup_updated") : t("lineup_added")
                  );
                }}
              >
                {existingLineup ? t("update") : t("add")}
              </Button>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(d) =>
              d &&
              setDate(
                `${d?.getFullYear()}-${String(
                  Number(d?.getMonth()) + 1
                ).padStart(2, "0")}-${String(d?.getDate()).padStart(2, "0")}`
              )
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
// TODO translation
