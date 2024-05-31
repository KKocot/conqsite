"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { DEFAULT_FORM_DATA, FormData } from "@/components/units-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";

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
  golden_units: any[],
  profile_units: { id: number; value: string }[]
) {
  const mergedGoldenUnits = golden_units.map((unit) => {
    const matchingGolden = profile_units.find((g) => g.id === unit.id);
    return { ...unit, matchingGolden };
  });
  return mergedGoldenUnits;
}

const List = ({ units, value }: { units: Unit[]; value: string }) => {
  return (
    <ul className="grid grid-cols-2 justify-items-center my-2 gap-1">
      {units.map((unit) =>
        unit.matchingGolden?.value === value ? (
          <li key={unit.id}>
            <img
              src={unit.icon}
              alt={unit.name}
              className="h-8 w-8 md:h-12 md:w-12"
              title={unit.name}
            />
          </li>
        ) : null
      )}
    </ul>
  );
};

export default function Component() {
  const params = useParams();
  const [profile, setProfile] = useState<FormData>({
    ...DEFAULT_FORM_DATA,
    discordId: Array.isArray(params.id) ? params.id[0] : params.id,
  });
  const blueUnits = lowUnits.filter((unit) => unit.era === "blue");
  const greenUnits = lowUnits.filter((unit) => unit.era === "green");
  const greyUnits = lowUnits.filter((unit) => unit.era === "grey");

  const golden = ownedUnits(goldenUnits, profile.units.golden);
  const heroic = ownedUnits(heroicUnits, profile.units.heroic);
  const blue = ownedUnits(blueUnits, profile.units.low);
  const green = ownedUnits(greenUnits, profile.units.low);
  const grey = ownedUnits(greyUnits, profile.units.low);
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/survey/${params.id}`);
      const data = await response.json();
      setProfile((prev) => (data.survey === null ? prev : data.survey));
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md w-full max-w-2xl">
        <div className="p-2 sm:p-8">
          <div className="flex items-center space-x-6">
            <Avatar className="w-16 h-16">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
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
          </div>
          <div className="flex flex-row justify-around py-8">
            <div>
              <h1 className="text-center">Golden</h1>
              <div className="flex flex-col">
                <List units={golden} value="3" />
                <List units={golden} value="2" />
                <List units={golden} value="1" />
              </div>
            </div>
            <div>
              <h1 className="text-center">Heroic</h1>
              <div className="flex flex-col">
                <List units={heroic} value="3" />
                <List units={heroic} value="2" />
                <List units={heroic} value="1" />
              </div>
            </div>
            <div>
              <h1 className="text-center">Blue</h1>
              <div className="flex flex-col">
                <List units={blue} value="3" />
                <List units={blue} value="2" />
                <List units={blue} value="1" />
              </div>
            </div>
            <div>
              <h1 className="text-center">Green</h1>
              <div className="flex flex-col">
                <List units={green} value="3" />
                <List units={green} value="2" />
                <List units={green} value="1" />
              </div>
            </div>
            <div>
              <h1 className="text-center">Grey</h1>
              <div className="flex flex-col">
                <List units={grey} value="3" />
                <List units={grey} value="2" />
                <List units={grey} value="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
