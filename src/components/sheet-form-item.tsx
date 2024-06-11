import { SheetTypes, Unit } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Input } from "./ui/input";

const Item = ({
  units,
  index,
  data,
  onEdit,
}: {
  units: Unit[];
  index: number;
  data: SheetTypes;
  onEdit: (
    index: number,
    username: string,
    unit1: string,
    unit2: string,
    unit3: string
  ) => void;
}) => {
  console.log(data, index);
  return (
    <li className="grid grid-cols-11 border-2 border-primary p-2 rounded-2xl items-center gap-2">
      <span className="col-span-2">
        <Input
          value={data.username}
          className="p-1"
          onChange={(e) =>
            onEdit(index, e.target.value, data.unit1, data.unit2, data.unit3)
          }
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit1}
          items={units}
          onChange={(value) =>
            onEdit(index, data.username, value, data.unit2, data.unit3)
          }
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit2}
          onChange={(value) =>
            onEdit(index, data.username, data.unit1, value, data.unit3)
          }
          items={units}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit3}
          onChange={(value) =>
            onEdit(index, data.username, data.unit1, data.unit2, value)
          }
          items={units}
        />
      </span>
    </li>
  );
};

export default Item;
