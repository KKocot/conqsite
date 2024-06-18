import { SheetTypes, SurveyProps, Unit, WeaponsTypes } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { getArtyAmount } from "@/lib/utils";
import { PackageOpen } from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";

type BorderColorProps =
  | "red"
  | "blue"
  | "slate"
  | "cyan"
  | "neutral"
  | "stone"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "sky"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

const ColorMenu = ({
  setColor,
}: {
  setColor: (e: BorderColorProps) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      <Button
        onClick={() => setColor("red")}
        className="bg-red-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("blue")}
        className="bg-blue-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("slate")}
        className="bg-slate-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("cyan")}
        className="bg-cyan-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("neutral")}
        className="bg-neutral-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("stone")}
        className="bg-stone-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("orange")}
        className="bg-orange-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("amber")}
        className="bg-amber-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("yellow")}
        className="bg-yellow-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("lime")}
        className="bg-lime-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("green")}
        className="bg-green-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("emerald")}
        className="bg-emerald-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("teal")}
        className="bg-teal-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("sky")}
        className="bg-sky-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("indigo")}
        className="bg-indigo-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("violet")}
        className="bg-violet-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("purple")}
        className="bg-purple-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("fuchsia")}
        className="bg-fuchsia-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("pink")}
        className="bg-pink-700 w-2 h-2 p-2"
      />
      <Button
        onClick={() => setColor("rose")}
        className="bg-rose-700 w-2 h-2 p-2"
      />
    </div>
  );
};

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
  const [color, setColor] = useState<BorderColorProps>("slate");
  const users_list = users.map((user) => user.inGameNick);
  const [user, setUser] = useState<SurveyProps | undefined>();
  const user_artillery = getArtyAmount(user?.artyAmount);
  function findUserByNick(nickname: string) {
    return users.find(
      (user) => user.discordNick === nickname || user.inGameNick === nickname
    );
  }
  useEffect(() => {
    setUser(findUserByNick(data.username));
  }, [data.username]);

  return (
    <li
      className={clsx(
        "grid grid-cols-14 border-4  p-2 rounded-2xl items-center gap-2 w-56",
        {
          "border-red-700": "red" === color,
          "border-blue-700": "blue" === color,
          "border-slate-700": "slate" === color,
          "border-cyan-700": "cyan" === color,
          "border-neutral-700": "neutral" === color,
          "border-stone-700": "stone" === color,
          "border-orange-700": "orange" === color,
          "border-amber-700": "amber" === color,
          "border-yellow-700": "yellow" === color,
          "border-lime-700": "lime" === color,
          "border-green-700": "green" === color,
          "border-emerald-700": "emerald" === color,
          "border-teal-700": "teal" === color,
          "border-sky-700": "sky" === color,
          "border-indigo-700": "indigo" === color,
          "border-violet-700": "violet" === color,
          "border-purple-700": "purple" === color,
          "border-fuchsia-700": "fuchsia" === color,
          "border-pink-700": "pink" === color,
          "border-rose-700": "rose" === color,
        }
      )}
    >
      <span className="flex flex-wrap gap-2">
        {user
          ? weapons.map((weapon, index) =>
              user.weapons[index].value ? (
                <span
                  key={weapon.id}
                  className="flex flex-col items-center justify-around"
                  title={weapon.name}
                >
                  <img src={weapon.src} className="rounded-full h-5" />
                  <span>{user.weapons[index].leadership}</span>
                </span>
              ) : null
            )
          : null}
        {user ? (
          <span
            title={user_artillery.title}
            className="flex flex-col items-center"
          >
            <PackageOpen className="h-5" />
            <span>{user_artillery.label}</span>
          </span>
        ) : null}
      </span>
      <span>
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
      <span>
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
      <span>
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
      <span>
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
      <span>
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
      <span>
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
      <ColorMenu setColor={(e) => setColor(e)} />
    </li>
  );
};

export default Item;
