import { SheetTypes, SurveyProps, Unit } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const Item = ({
  units,
  index,
  data,
  onEdit,
  users,
}: {
  units: Unit[];
  index: number;
  data: SheetTypes;
  onEdit: (
    index: number,
    username: string,
    unit1: string,
    unit2: string,
    unit3: string,
    weapon: string,
    description: string
  ) => void;
  users: SurveyProps[];
}) => {
  const users_list = users.map((user) => user.inGameNick);
  return (
    <li className="grid grid-cols-14 border-2 border-primary p-2 rounded-2xl items-center gap-2 w-56">
      <span className="col-span-2">
        <Autocompleter
          value={data.username}
          onChange={(value) =>
            onEdit(
              index,
              value,
              data.unit1,
              data.unit2,
              data.unit3,
              data.weapon,
              data.description
            )
          }
          users={users_list}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit1}
          units={units}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              value,
              data.unit2,
              data.unit3,
              data.weapon,
              data.description
            )
          }
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit2}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              value,
              data.unit3,
              data.weapon,
              data.description
            )
          }
          units={units}
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit3}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              data.unit2,
              value,
              data.weapon,
              data.description
            )
          }
          units={units}
        />
      </span>
      <span className="col-span-2">
        <Input
          value={data.weapon}
          className="p-1"
          onChange={(e) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              data.unit2,
              data.unit3,
              e.target.value,
              data.description
            )
          }
        />
      </span>
      <span className="col-span-2">
        <Textarea
          value={data.description}
          className="p-1"
          onChange={(e) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              data.unit2,
              data.unit3,
              data.weapon,
              e.target.value
            )
          }
        />
      </span>
    </li>
  );
};

export default Item;
