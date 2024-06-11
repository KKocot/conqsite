import { SheetData, Unit } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Input } from "./ui/input";
import { useState } from "react";

const Item = ({
  units,
  data,
  setData,
}: {
  units: Unit[];
  data: SheetData;
  setData: React.Dispatch<React.SetStateAction<SheetData>>;
}) => {
  return (
    <li className="grid grid-cols-11 border-2 border-primary p-2 rounded-2xl items-center gap-2">
      <span className="col-span-2">
        <Input
          value={data.username}
          className="p-1"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit1}
          onChange={(value) => setData((prev) => ({ ...prev, unit1: value }))}
          items={units}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit2}
          onChange={(value) => setData((prev) => ({ ...prev, unit2: value }))}
          items={units}
        />
      </span>
    </li>
  );
};

export default Item;
