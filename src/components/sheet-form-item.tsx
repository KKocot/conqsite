import { goldenUnits } from "@/assets/golden-units-data";
import { Autocompleter } from "./autocompleter";
import { Input } from "./ui/input";
import { heroicUnits } from "@/assets/heroic-units-data";
import { useState } from "react";
import { lowUnits } from "@/assets/low-units-data";

const Item = () => {
  const [unitValue, setUnitValue] = useState("");
  const [user, setUser] = useState("");
  const arrays = [...goldenUnits, ...heroicUnits, ...lowUnits];

  return (
    <li className="grid grid-cols-11 border-2 border-primary p-2 rounded-2xl items-center">
      <span className="col-span-2">
        <Input
          value={user}
          className="p-1"
          onChange={(e) => setUser(e.target.value)}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={unitValue}
          onChange={setUnitValue}
          items={arrays}
        />
      </span>
    </li>
  );
};
