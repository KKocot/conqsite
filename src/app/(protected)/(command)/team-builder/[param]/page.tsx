"use client";

import React, { useState } from "react";
import Content from "./content";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getCloserDay } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSurveys } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

const Page: React.FC = () => {
  const { param: house }: { param: string } = useParams();
  const [date, setDate] = React.useState<Date>(new Date());
  const [load, setLoad] = useState(false);
  const next_tw = getCloserDay();

  const { data, isLoading } = useQuery({
    queryKey: ["surveysList", house],
    queryFn: () => getSurveys(house),
    enabled: !!house,
  });
  if (isLoading) return <LoadingComponent />;
  if (!data) return <NoData />;

  return (
    <div className="w-full">
      {/* {!load || !date ? (
        <>
          <div className="gap-4 flex pt-16 items-center flex-col h-full">
            <p>Get data from selected house and date</p>
            <div className="flex justify-around w-full items-center">
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
              <Button
                disabled={!date}
                onClick={() => setLoad(true)}
                className="w-40 h-40 rounded-full bg-accent text-background text-xl font-bold hover:text-accent"
              >
                Accept
              </Button>
            </div>
          </div>
        </>
      ) : ( */}
      <Content
        house={house}
        surveysData={data}
        nextTW={`${date?.getFullYear()}-${String(
          Number(date?.getMonth()) + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`}
      />
      {/* )} */}
    </div>
  );
};

export default Page;
// TODO translation
