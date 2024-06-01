"use client";

import React, { useState } from "react";
import { goldenUnits } from "@/assets/golden-units-data";
import { Autocompleter } from "@/components/autocompleter";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
const form = [
  "User 1",
  "User 2",
  "User 3",
  "User 4",
  "User 5",
  "User 6",
  "User 7",
  "User 8",
  "User 9",
  "User 10",
  "User 11",
  "User 12",
  "User 13",
  "User 14",
  "User 15",
];
const Item = ({ index, name }: { index: number; name: string }) => {
  const [value, setValue] = useState("");
  return (
    <li className="grid grid-cols-11 border-2 border-primary p-2 rounded-2xl items-center">
      <span className="col-span-1">{index + 1}</span>
      <span className="col-span-2">
        <Input value={name} className="p-1" />
      </span>
      <span className="col-span-2">
        <Autocompleter value={value} onChange={setValue} items={goldenUnits} />
      </span>
      <span className="col-span-2">
        <Autocompleter value={value} onChange={setValue} items={goldenUnits} />
      </span>
      <span className="col-span-2">
        <Autocompleter value={value} onChange={setValue} items={goldenUnits} />
      </span>
      <span className="col-span-2 text-center">Opis</span>
    </li>
  );
};

const CheckboxItem = ({ label }: { label: string }) => {
  return (
    <AccordionContent>
      <div className="flex items-center space-x-2">
        <Checkbox id={label} />
        <label
          htmlFor={label}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </AccordionContent>
  );
};

const Page: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Filtry</AccordionTrigger>
          <AccordionContent className="flex justify-between p-2">
            <CheckboxItem label="Zlota era" />
            <CheckboxItem label="Heroic era" />
            <CheckboxItem label="Reszta" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ul className="flex flex-col gap-2">
        {form.map((e, index) => (
          <Item index={index} name={e} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
