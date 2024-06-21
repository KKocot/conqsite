import {
  BorderColorProps,
  SheetTypes,
  SurveyProps,
  Unit,
  WeaponsTypes,
} from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { getArtyAmount } from "@/lib/utils";
import { PackageOpen } from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";
import { altillery } from "@/assets/artillery";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

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
        title="red"
      />
      <Button
        onClick={() => setColor("blue")}
        className="bg-blue-700 w-2 h-2 p-2"
        title="blue"
      />
      <Button
        onClick={() => setColor("slate")}
        className="bg-slate-700 w-2 h-2 p-2"
        title="slate"
      />
      <Button
        onClick={() => setColor("cyan")}
        className="bg-cyan-700 w-2 h-2 p-2"
        title="cyan"
      />
      <Button
        onClick={() => setColor("neutral")}
        className="bg-neutral-700 w-2 h-2 p-2"
        title="neutral"
      />
      <Button
        onClick={() => setColor("stone")}
        className="bg-stone-700 w-2 h-2 p-2"
        title="stone"
      />
      <Button
        onClick={() => setColor("orange")}
        className="bg-orange-700 w-2 h-2 p-2"
        title="orange"
      />
      <Button
        onClick={() => setColor("amber")}
        className="bg-amber-700 w-2 h-2 p-2"
        title="amber"
      />
      <Button
        onClick={() => setColor("yellow")}
        className="bg-yellow-700 w-2 h-2 p-2"
        title="yellow"
      />
      <Button
        onClick={() => setColor("lime")}
        className="bg-lime-700 w-2 h-2 p-2"
        title="lime"
      />
      <Button
        onClick={() => setColor("green")}
        className="bg-green-700 w-2 h-2 p-2"
        title="green"
      />
      <Button
        onClick={() => setColor("emerald")}
        className="bg-emerald-700 w-2 h-2 p-2"
        title="emerald"
      />
      <Button
        onClick={() => setColor("teal")}
        className="bg-teal-700 w-2 h-2 p-2"
        title="teal"
      />
      <Button
        onClick={() => setColor("sky")}
        className="bg-sky-700 w-2 h-2 p-2"
        title="sky"
      />
      <Button
        onClick={() => setColor("indigo")}
        className="bg-indigo-700 w-2 h-2 p-2"
        title="indigo"
      />
      <Button
        onClick={() => setColor("violet")}
        className="bg-violet-700 w-2 h-2 p-2"
        title="violet"
      />
      <Button
        onClick={() => setColor("purple")}
        className="bg-purple-700 w-2 h-2 p-2"
        title="purple"
      />
      <Button
        onClick={() => setColor("fuchsia")}
        className="bg-fuchsia-700 w-2 h-2 p-2"
        title="fuchsia"
      />
      <Button
        onClick={() => setColor("pink")}
        className="bg-pink-700 w-2 h-2 p-2"
        title="pink"
      />
      <Button
        onClick={() => setColor("rose")}
        className="bg-rose-700 w-2 h-2 p-2"
        title="rose"
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
    description: string,
    color: BorderColorProps
  ) => void;
}) => {
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
        "grid grid-cols-14 border-4  p-2 rounded-2xl gap-2 w-56 mx-auto",
        {
          "border-red-700": "red" === data.color,
          "border-blue-700": "blue" === data.color,
          "border-slate-700": "slate" === data.color,
          "border-cyan-700": "cyan" === data.color,
          "border-neutral-700": "neutral" === data.color,
          "border-stone-700": "stone" === data.color,
          "border-orange-700": "orange" === data.color,
          "border-amber-700": "amber" === data.color,
          "border-yellow-700": "yellow" === data.color,
          "border-lime-700": "lime" === data.color,
          "border-green-700": "green" === data.color,
          "border-emerald-700": "emerald" === data.color,
          "border-teal-700": "teal" === data.color,
          "border-sky-700": "sky" === data.color,
          "border-indigo-700": "indigo" === data.color,
          "border-violet-700": "violet" === data.color,
          "border-purple-700": "purple" === data.color,
          "border-fuchsia-700": "fuchsia" === data.color,
          "border-pink-700": "pink" === data.color,
          "border-rose-700": "rose" === data.color,
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
              data.description,
              data.color
            )
          }
          users={users_list}
        />
      </span>
      <span>
        <Autocompleter
          value={data.unit1}
          user={user}
          units={units}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              value,
              data.unit2,
              data.unit3,
              data.weapon,
              data.description,
              data.color
            )
          }
        />
      </span>
      <span>
        <Autocompleter
          value={data.unit2}
          user={user}
          units={units}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              value,
              data.unit3,
              data.weapon,
              data.description,
              data.color
            )
          }
        />
      </span>
      <span>
        <Autocompleter
          value={data.unit3}
          user={user}
          units={units}
          onChange={(value) =>
            onEdit(
              index,
              data.username,
              data.unit1,
              data.unit2,
              value,
              data.weapon,
              data.description,
              data.color
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
              data.description,
              data.color
            )
          }
        />
      </span>
      <span>
        <div className="flex flex-wrap justify-between">
          {altillery.slice(0, 7).map((e) => (
            <img
              className={clsx(
                "h-9 w-9 rounded-full mt-2 p-1 cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-300",
                { "bg-emerald-700 hover:bg-emerald-900": false }
              )}
              title={e.name}
              alt={e.name}
              src={e.src}
            />
          ))}
          <span
            title={user_artillery.title}
            className="flex flex-col items-center mt-2"
          >
            <PackageOpen className="h-5" />
            <span className="text-xs">{user_artillery.label}</span>
          </span>
          {altillery.slice(7, 9).map((e) => (
            <img
              className={clsx(
                "h-9 w-9 mt-2 rounded-full p-1 cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-300",
                { "bg-emerald-700 hover:bg-emerald-900": false }
              )}
              title={e.name}
              alt={e.name}
              src={e.src}
            />
          ))}
        </div>
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
              e.target.value,
              data.color
            )
          }
        />
      </span>
      <ColorMenu
        setColor={(value) =>
          onEdit(
            index,
            data.username,
            data.unit1,
            data.unit2,
            data.unit3,
            data.weapon,
            data.description,
            value
          )
        }
      />
    </li>
  );
};

export default Item;
