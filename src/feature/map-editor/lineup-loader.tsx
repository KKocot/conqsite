import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getPublicLineup, PublicLineup } from "@/lib/get-data";
import { useEffect, useState } from "react";

const LineupLoader = ({
  dates,
  house,
  lineup,
  onLineupChange,
}: {
  dates: string[];
  house: string;
  lineup: PublicLineup | undefined;
  onLineupChange: (lineup: PublicLineup) => void;
}) => {
  const [date, setDate] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<string>("item-1");
  const [lineups, setLineups] = useState<PublicLineup[] | undefined>(undefined);
  useEffect(() => {
    if (date !== "") {
      setOpen("item-2");
    } else {
      setOpen("item-1");
    }
  }, [date]);

  const getLineup = async (pickedDate: string) => {
    try {
      const response = await getPublicLineup(house, pickedDate);
      if (!response) {
        console.error("Error occurred:", response);
      } else {
        setLineups(response);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="custom" className="w-full">
          Load Lineup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-4">Load Lineup</h3>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={open}
          onValueChange={setOpen}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Select a date to load the lineup for {house}.{" "}
              {date !== "" ? `Selected date: ${date}` : ""}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex gap-2 flex-wrap justify-around">
                {dates.map((date) => (
                  <Button
                    key={date}
                    onClick={() => {
                      setDate(date);
                      getLineup(date);
                    }}
                    variant="custom"
                  >
                    {date}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Choose Lineup</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {lineups && lineups.length > 0 ? (
                lineups.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <span>{item.name}</span>
                    <Button
                      variant="custom"
                      onClick={() => {
                        onLineupChange(item);
                        setOpenDialog(false);
                      }}
                    >
                      Load
                    </Button>
                  </div>
                ))
              ) : (
                <p>No lineups available.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};
export default LineupLoader;
