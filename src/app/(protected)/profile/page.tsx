"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { lowUnits } from "@/assets/low-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import clsx from "clsx";
import { weapons } from "@/assets/weapons";
import { SurveyProps } from "@/lib/type";
import { DEFAULT_FORM_DATA } from "@/components/wizard-form";
import { useSession } from "next-auth/react";
import { useLocalStorage } from "usehooks-ts";
import Loading from "react-loading";

interface Unit {
  era: string;
  icon: string;
  id: number;
  leadership: number;
  masteryPoints: boolean;
  name: string;
  src: string;
  value: number;
  matchingGolden?: { id: number; value: string };
}

function ownedUnits(
  units: Unit[],
  profile_units: { id: number; value: string }[]
) {
  const mergedGoldenUnits = units.map((unit) => {
    const matchingGolden = profile_units.find((g) => g.id === unit.id);
    return { ...unit, matchingGolden };
  });
  return mergedGoldenUnits;
}

const List = ({ units, value }: { units: Unit[]; value: string }) => {
  return (
    <TableCell>
      <div className="flex flex-wrap gap-2 justify-center">
        {units.map((unit) =>
          unit.matchingGolden?.value === value ? (
            <span key={unit.id} className="w-fit">
              {unit.value >= 9 ? (
                <div className="group relative w-fit" title="Jednostka z Mety">
                  <div className="absolute bottom-auto left-2 md:left-5 right-auto md:top-2 z-50 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 scale-x-100 whitespace-nowrap rounded-full bg-red-600 px-1.5 py-1 text-center text-xs font-bold leading-none text-white">
                    M
                  </div>
                </div>
              ) : null}
              <Avatar
                className={clsx(
                  "h-8 w-8 md:h-12 md:w-12 border-solid border-2 border-transparent shadow-md rounded-none",
                  {
                    "border-red-600": unit.value >= 9,
                  }
                )}
                title={unit.name}
              >
                <AvatarImage alt={unit.name} src={unit.icon} />
                <AvatarFallback className="rounded-none">U</AvatarFallback>
              </Avatar>
            </span>
          ) : null
        )}
      </div>
    </TableCell>
  );
};

export default function Component() {
  const { data: user_data } = useSession();
  const [storage, setStorage] = useLocalStorage("MyForm", null);
  const [profile, setProfile] = useState<SurveyProps>(
    storage ?? DEFAULT_FORM_DATA
  );
  const [isClient, setIsClient] = useState(false);

  const blueUnits = lowUnits.filter((unit) => unit.era === "blue");
  const greenUnits = lowUnits.filter((unit) => unit.era === "green");
  const greyUnits = lowUnits.filter((unit) => unit.era === "grey");

  const golden = ownedUnits(goldenUnits, profile.units.golden);
  const heroic = ownedUnits(heroicUnits, profile.units.heroic);
  const blue = ownedUnits(blueUnits, profile.units.low);
  const green = ownedUnits(greenUnits, profile.units.low);
  const grey = ownedUnits(greyUnits, profile.units.low);
  const weapons_list = weapons.map((weapon) => {
    const matchingWeapon = profile.weapons.find(
      (w, index) => index + 1 === weapon.id
    );
    return { ...weapon, matchingWeapon };
  });
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/survey/${user_data?.user.id}`);
      const data = await response.json();
      setStorage(data.survey);
      setProfile(data.survey);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    if (!storage) fetchData();
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div className="p-2 sm:p-8">
          <div className="flex items-center gap-10">
            <Avatar className="w-16 h-16">
              <AvatarImage
                alt="@shadcn"
                src={user_data?.user.image ?? "/placeholder-avatar.jpg"}
              />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                <span>{profile.inGameNick}</span>(
                <span className="text-red-600">{profile.characterLevel}</span>)
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {profile.discordNick}
              </p>
            </div>
            <ul className="flex gap-8 flex-wrap">
              {weapons_list.map((e) =>
                e.matchingWeapon?.value ? (
                  <li
                    key={e.id}
                    className="flex flex-col items-center w-18"
                    title={"Dowodzenie: " + e.matchingWeapon.leadership}
                  >
                    <img src={e.src} className="rounded-full w-12 h-12" />
                    <span className="text-sm">{e.name}</span>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div className="py-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center px-0">
                    Wymaksowana i Preferuje
                  </TableHead>
                  <TableHead className="text-center px-0">Preferuje</TableHead>
                  <TableHead className="text-center px-0">
                    Wymaksowana
                  </TableHead>
                  <TableHead className="text-center px-0">Posiadam</TableHead>
                  <TableHead className="text-center px-0">
                    Nie posiadam
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <List units={golden} value="4" />
                  <List units={golden} value="3" />
                  <List units={golden} value="2" />
                  <List units={golden} value="1" />
                  <List units={golden} value="0" />
                </TableRow>
                <TableRow>
                  <List units={heroic} value="4" />
                  <List units={heroic} value="3" />
                  <List units={heroic} value="2" />
                  <List units={heroic} value="1" />
                  <List units={heroic} value="0" />
                </TableRow>
                <TableRow>
                  <List units={blue} value="4" />
                  <List units={blue} value="3" />
                  <List units={blue} value="2" />
                  <List units={blue} value="1" />
                  <List units={blue} value="0" />
                </TableRow>
                <TableRow>
                  <List units={green} value="4" />
                  <List units={green} value="3" />
                  <List units={green} value="2" />
                  <List units={green} value="1" />
                  <List units={green} value="0" />
                </TableRow>
                <TableRow>
                  <List units={grey} value="4" />
                  <List units={grey} value="3" />
                  <List units={grey} value="2" />
                  <List units={grey} value="1" />
                  <List units={grey} value="0" />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loading color="#94a3b8" />
        </div>
      )}
    </div>
  );
}
