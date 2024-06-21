import {
  ArtilleryProps,
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
import { artillery } from "@/assets/artillery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const colors = [
  "-red-700",
  "-blue-700",
  "-cyan-700",
  "-neutral-700",
  "-orange-700",
  "-yellow-700",
  "-lime-700",
  "-teal-700",
  "-sky-700",
  "-indigo-700",
  "-violet-700",
  "-fuchsia-700",
  "-rose-700",
  "-slate-700",
];
const ColorMenu = ({ setColor }: { setColor: (e: string) => void }) => {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {colors.map((e) => (
        <Button
          key={e}
          onClick={() => setColor(e)}
          className={`w-1 h-1 p-3 bg${e}`}
        />
      ))}
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
    color: string,
    altillery: ArtilleryProps[]
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
      className={` grid grid-cols-14 border-4  p-2 rounded-2xl gap-2 w-56 mx-auto border${data.color}`}
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
              data.color,
              data.artillery
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
              data.color,
              data.artillery
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
              data.color,
              data.artillery
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
              data.color,
              data.artillery
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
              data.color,
              data.artillery
            )
          }
        />
      </span>
      <span>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Artyleria</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {artillery.map((e) => (
                  <img
                    className={clsx(
                      "h-10 w-10 rounded-full mt-2 p-1 cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-300",
                      {
                        "bg-emerald-700 hover:bg-emerald-900":
                          data.artillery.find((a) => a.id === e.id)?.check,
                      }
                    )}
                    key={e.id}
                    title={e.name}
                    alt={e.name}
                    src={e.src}
                    onClick={() => {
                      const artilleryIndex = data.artillery.findIndex(
                        (art) => art.id === e.id
                      );

                      let updatedArtillery;
                      if (artilleryIndex !== -1) {
                        updatedArtillery = data.artillery.map((art, index) =>
                          index === artilleryIndex
                            ? { ...art, check: !art.check }
                            : art
                        );
                      } else {
                        updatedArtillery = [
                          ...data.artillery,
                          { id: e.id, check: true },
                        ];
                      }
                      onEdit(
                        index,
                        data.username,
                        data.unit1,
                        data.unit2,
                        data.unit3,
                        data.weapon,
                        data.description,
                        data.color,
                        updatedArtillery
                      );
                    }}
                  />
                ))}
                <span
                  title={user_artillery.title}
                  className="flex flex-col items-center mt-2"
                >
                  <PackageOpen className="h-5" />
                  <span className="text-xs">{user_artillery.label}</span>
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
              data.color,
              data.artillery
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
            value,
            data.artillery
          )
        }
      />
    </li>
  );
};

export default Item;
