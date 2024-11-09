import { ArtilleryProps, SheetTypes, Unit, WeaponsTypes } from "@/lib/type";
import { Autocompleter } from "./autocompleter";
import { Textarea } from "./ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { useArtyAmount } from "@/lib/utils";
import { PackageOpen } from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";
import { artillery } from "@/assets/artillery";
import { useTranslations } from "next-intl";
import { Survey } from "@/lib/get-data";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";

import Image from "next/image";
import { EntryData } from "@/lib/defaults";

function findUserByNick(users: Survey[], nickname: string) {
  return users.find(
    (user) => user.discordNick === nickname || user.inGameNick === nickname
  );
}

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
function mapUnitsByEra(
  units: Unit[],
  userUnits?: Survey,
  era: string | string[] = "low"
) {
  const isEraArray = Array.isArray(era);
  const filteredUnits = units?.filter((u) =>
    isEraArray ? era.includes(u.era) : u.era === era
  );
  const userUnitsKey: string = isEraArray ? "low" : era;
  const userUnitsFiltered =
    userUnits?.units?.[userUnitsKey as keyof typeof userUnits.units] ?? [];

  return filteredUnits?.map((unit: Unit) => {
    const userUnit = userUnitsFiltered?.find((u) => u.id === unit.id);
    return { pref: userUnit?.value, ...unit };
  });
}

export const TeamEntry = ({
  units,
  users,
  weapons,
  index,
  data,
  onEdit,
}: {
  units: Unit[];
  users: Survey[];
  weapons: WeaponsTypes[];
  index: number;
  data: SheetTypes;
  onEdit: (index: number, data: Partial<EntryData>) => void;
}) => {
  const t = useTranslations("BuildTeam");
  const users_list = users.map((user) => user.inGameNick);
  const [user, setUser] = useState<Survey | undefined>();
  const user_artillery = useArtyAmount(user?.artyAmount);

  const leadership = useMemo(() => {
    const unit1_leadership = units.find(
      (unit) => unit.name === data.unit1
    )?.leadership;
    const unit2_leadership = units.find(
      (unit) => unit.name === data.unit2
    )?.leadership;
    const unit3_leadership = units.find(
      (unit) => unit.name === data.unit3
    )?.leadership;
    return (
      (unit1_leadership ?? 0) +
      (unit2_leadership ?? 0) +
      (unit3_leadership ?? 0)
    );
  }, [data.unit1, data.unit2, data.unit3, units]);

  useEffect(() => {
    setUser(findUserByNick(users, data.username));
  }, [data.username]);

  const handleArtilleryClick = (id: number) => () => {
    const artilleryIndex = data.artillery.findIndex((art) => art.id === id);
    const updatedArtillery = data.artillery.map((art, index) => ({
      ...art,
      check: index === artilleryIndex ? !art.check : art.check,
    }));
    if (artilleryIndex === -1) {
      updatedArtillery.push({ id, check: true });
    }
    onEdit(index, { artillery: updatedArtillery });
  };

  const units_user = useMemo(() => {
    const golden_units_user = mapUnitsByEra(units, user, "golden");
    const heroic_units_user = mapUnitsByEra(units, user, "heroic");
    const low_units_user = mapUnitsByEra(units, user, [
      "blue",
      "green",
      "grey",
    ]);
    const other_units_user = units?.filter((u) => u.era === "other");
    return [
      ...golden_units_user,
      ...heroic_units_user,
      ...low_units_user,
      ...other_units_user,
    ];
  }, [units]);
  return (
    <li
      className={clsx(
        `grid grid-cols-14 border-4 p-2  gap-2 w-56 mx-auto border${data.color}`,
        {
          "bg-slate-300 dark:bg-slate-900": !user?.inGameNick,
        }
      )}
    >
      <div className="flex flex-wrap gap-2">
        {user
          ? weapons.map((weapon, index) =>
              user.weapons[index].value ? (
                <div
                  key={weapon.id}
                  className="flex flex-col items-center justify-around"
                  title={weapon.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={weapon.src}
                    alt={weapon.name}
                    className={clsx("rounded-full h-5 shadow-md", {
                      "shadow-yellow-500": user.weapons[index].pref === 1,
                      "shadow-purple-500": user.weapons[index].pref === 2,
                      "shadow-blue-500": user.weapons[index].pref === 3,
                      "shadow-green-500": user.weapons[index].pref === 4,
                    })}
                  />
                  <span
                    className={clsx({
                      "text-yellow-500": user.weapons[index].pref === 1,
                      "text-purple-500": user.weapons[index].pref === 2,
                      "text-blue-500": user.weapons[index].pref === 3,
                      "text-green-500": user.weapons[index].pref === 4,
                    })}
                  >
                    {user.weapons[index].leadership}
                  </span>
                </div>
              ) : null
            )
          : null}
      </div>
      <Autocompleter
        placeholder={t("username")}
        value={data.username}
        onChange={(username) => onEdit(index, { username })}
        users={users_list}
      />
      <Autocompleter
        placeholder={t("1st_unit")}
        value={data.unit1}
        user={user}
        units={units_user}
        onChange={(unit1) => onEdit(index, { unit1 })}
      />
      <Autocompleter
        placeholder={t("2nd_unit")}
        value={data.unit2}
        user={user}
        units={units_user}
        onChange={(unit2) => onEdit(index, { unit2 })}
      />
      <Autocompleter
        placeholder={t("3rd_unit")}
        value={data.unit3}
        user={user}
        units={units_user}
        onChange={(unit3) => onEdit(index, { unit3 })}
      />
      <span>{t("leadership_cost") + (leadership ? leadership : 0)}</span>

      <Autocompleter
        placeholder={t("weapon")}
        weapons={weapons}
        value={data.weapon}
        onChange={(weapon) => onEdit(index, { weapon })}
      />
      <div className="space-y-2 px-2 pb-2">
        <span> {t("artillery")}</span>

        <div className="grid grid-cols-4 gap-3 justify-center">
          {artillery.map((e) => (
            <button
              key={e.id}
              className={clsx(
                "size-10 rounded-full overflow-hidden ring relative cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-300",
                {
                  "ring-emerald-700 hover:ring-emerald-900":
                    data.artillery.find((a) => a.id === e.id)?.check,
                }
              )}
              onClick={handleArtilleryClick(e.id)}
            >
              <Image title={e.name} alt={e.name} src={e.src} fill />
            </button>
          ))}
          <button
            title={user_artillery.title}
            className="flex flex-col items-center mt-2"
          >
            <PackageOpen className="h-5" />
            <span className="text-xs">{user_artillery.label}</span>
          </button>
        </div>
      </div>
      <Textarea
        placeholder={t("description")}
        value={data.description}
        className="p-1"
        onChange={(e) => onEdit(index, { description: e.target.value })}
      />
      <ColorMenu setColor={(color) => onEdit(index, { color })} />
    </li>
  );
};
