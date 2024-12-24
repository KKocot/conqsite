import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetTypes } from "@/lib/type";
import { useState } from "react";
import { toast } from "react-toastify";
import { Calendar } from "../../components/ui/calendar";
import { Send } from "lucide-react";

export function PublicDialog({
  data,
  house,
}: {
  data: SheetTypes[];
  house: string;
}) {
  const [publicationName, setPublicationName] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/publicLineup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: publicationName,
          house: house,
          date: `${date?.getFullYear()}-${String(
            Number(date?.getMonth()) + 1
          ).padStart(2, "0")}-${String(date?.getDate()).padStart(2, "0")}`,
          sheet: data,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        const responseData = await response.json();
        toast.success("Lineup Published", {
          data: {
            title: "Lineup Published",
          },
        });
        console.log("Success:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Send className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Public</DialogTitle>
          <DialogDescription>
            Public your lineup to the community
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <Label htmlFor="name" className="text-right">
              Lineup Name
            </Label>
            <Input
              id="name"
              value={publicationName}
              onChange={(e) => setPublicationName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="date" className="text-right">
              Lineup Date
            </Label>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={publicationName === ""}
          >
            Public Lineup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// TODO translation
