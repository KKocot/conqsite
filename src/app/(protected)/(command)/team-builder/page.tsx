"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import Content from "./content";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { getCloserDay } from "@/lib/utils";

const Page: React.FC = () => {
  const { data: commander } = useSession();
  const { data: command_list = [] } = useQuery(rolesQueryOptions());
  const [house, setHouse] = useState<string | undefined>(undefined);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [load, setLoad] = useState(false);
  const houses = command_list.filter((e) => e.discordId === commander?.user.id);
  const next_tw = getCloserDay();

  return (
    <div>
      {!load || !date || !house ? (
        <>
          <div className="gap-4 flex pt-16 items-center flex-col h-full">
            <p>Get data from selected house and date</p>{" "}
            <div className="flex justify-around w-full">
              <div className="gap-4 flex flex-col items-center ">
                <h1 className="text-2xl font-blod">Choose a house</h1>
                <div className="flex gap-4">
                  <Select
                    onValueChange={(value) => setHouse(value)}
                    value={house}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a house" />
                    </SelectTrigger>
                    <SelectContent>
                      {houses.map((e) => (
                        <SelectItem key={e.house} value={e.house}>
                          {e.house}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="gap-4 flex flex-col items-center ">
                <h1 className="text-2xl font-blod">Choose a date</h1>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                />
                <Button onClick={() => setDate(next_tw)} variant="custom">
                  Next TW
                </Button>
              </div>
            </div>
            <Button
              disabled={!house || !date}
              onClick={() => setLoad(true)}
              className="w-40 h-40 rounded-full bg-accent text-background text-xl font-bold hover:text-accent"
            >
              Accept
            </Button>
          </div>
        </>
      ) : (
        <Content house={house} nextTW={date.toISOString().split("T")[0]} />
      )}
    </div>
  );
};

export default Page;
// TODO translation
