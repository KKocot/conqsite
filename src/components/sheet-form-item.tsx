import { Unit } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Input } from "./ui/input";
import { useState } from "react";

const Item = ({ units }: { units: Unit[] }) => {
  const [unitValue, setUnitValue] = useState("");
  const [user, setUser] = useState("");

  return (
    <li className="grid grid-cols-11 border-2 border-primary p-2 rounded-2xl items-center gap-2">
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
          items={units}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={unitValue}
          onChange={setUnitValue}
          items={units}
        />
      </span>
    </li>
  );
};

export default Item;
