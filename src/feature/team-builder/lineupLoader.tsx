"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getNextTWLineups, LineupData, Survey } from "@/lib/get-data";
import { getCloserDay } from "@/lib/utils";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const LineupLoader = ({
  setUserList,
  surveysData,
}: {
  setUserList: Dispatch<SetStateAction<Survey[]>>;
  surveysData: Survey[];
}) => {
  const t = useTranslations("BuildTeam");
  const { param: house }: { param: string } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const next_tw = getCloserDay();
  const [data, setData] = useState<LineupData | undefined>(undefined);
  const onSubmit = async () => {
    const response = await getNextTWLineups(
      house,
      `${date?.getFullYear()}-${String(Number(date?.getMonth()) + 1).padStart(
        2,
        "0"
      )}-${String(date?.getDate()).padStart(2, "0")}`
    );
    setData(response);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bot className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Load list from bot</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around w-full items-center flex-col">
          <div className="gap-4 flex flex-col items-center ">
            <div className="flex justify-between w-full">
              <h1 className="text-2xl font-blod">Choose a date</h1>
              <Button onClick={() => setDate(next_tw)} variant="custom">
                Next TW
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
          </div>
          <Button disabled={!date} variant="custom" onClick={onSubmit}>
            Load attendance from Discord Bot
          </Button>
        </div>
        {data ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-center">{`Attendance loaded from ${data.date}`}</h1>
            <h1 className="text-lg text-center">Pick lineup</h1>
            <div className="flex flex-col gap-4">
              {data.lineup.map((e) => (
                <Button
                  key={e.name}
                  onClick={() =>
                    setUserList(
                      surveysData.filter((s) => e.signup.includes(s.discordId))
                    )
                  }
                >
                  {e.name}
                </Button>
              ))}
              <Button onClick={() => setUserList(surveysData)}>
                Upload all players
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default LineupLoader;
