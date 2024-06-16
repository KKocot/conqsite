import { SheetTypes, SurveyProps, Unit, WeaponsTypes } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

const Item = ({
  units,
  users,
  weapons,
  index,
  data,
  onEdit,
}: {
  units: Unit[];
  users: SurveyProps[];
  weapons: WeaponsTypes[];
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
}) => {
  const users_list = users.map((user) => user.inGameNick);
  const [user, setUser] = useState<SurveyProps | undefined>();
  function findUserByNick(nickname: string) {
    return users.find(
      (user) => user.discordNick === nickname || user.inGameNick === nickname
    );
  }
  useEffect(() => {
    setUser(findUserByNick(data.username));
  }, [data.username]);
  return (
    <li className="grid grid-cols-14 border-2 border-primary p-2 rounded-2xl items-center gap-2 w-56">
      <span className="col-span-2 flex flex-wrap gap-2">
        {user
          ? weapons.map((weapon, index) =>
              user.weapons[index].value ? (
                <span key={weapon.id}>
                  <img src={weapon.src} className="rounded-full h-5" />
                  <span>{user.weapons[index].leadership}</span>
                </span>
              ) : null
            )
          : null}
      </span>
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
          units={units}
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
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          value={data.unit3}
          units={units}
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
        />
      </span>
      <span className="col-span-2">
        <Autocompleter
          weapons={weapons}
          value={data.weapon}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              data.unit2,
              data.unit3,
              value,
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
