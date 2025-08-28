"use client";

import { Input } from "@/components/ui/input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import List from "./list";
import NoData from "../ifs/no-data";
import { Filter } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { allUnitsAssetsOptions } from "./lib/query";
import { unitTypes } from "./lib/utils";

const ListTab = ({ sort }: { sort: string }) => {
  const { data } = useSuspenseQuery(allUnitsAssetsOptions);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>(sort);
  return (
    <div className="relative flex flex-col gap-6 mt-6 mb-24">
      {data ? <List data={data} query={query} filter={filter} /> : <NoData />}
      <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-2 shadow-lg w-64">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search unit"
          />
        </div>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="filter">
            <AccordionTrigger className="p-1">
              Filter by ({filter})
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-1">
              {unitTypes.map((type) => (
                <div key={type}>
                  <RadioGroup
                    onValueChange={(value) => {
                      setFilter(value);
                      router.push(
                        `/dashboard/units?card=fillList&sort=${value}`
                      );
                    }}
                    value={filter}
                    className="cols-span-1"
                  >
                    <div className="h-full text-justify">
                      <RadioGroupItem
                        value={type}
                        id={type}
                        className="hidden"
                      />
                      <Label htmlFor={type} className="capitalize">
                        <div
                          className={clsx("p-2 cursor-pointer", {
                            "bg-accent text-accent-foreground": filter === type,
                          })}
                        >
                          {type}
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ListTab;
