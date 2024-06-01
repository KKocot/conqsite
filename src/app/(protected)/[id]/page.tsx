"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { DEFAULT_FORM_DATA, FormData } from "@/components/units-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { lowUnits } from "@/assets/low-units-data";
import { weapons } from "@/assets/weapons";
import { heroicUnits } from "@/assets/heroic-units-data";
import { goldenUnits } from "@/assets/golden-units-data";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

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
    <TableCell>
      <div className="flex flex-wrap gap-2 justify-center">
        {units.map((unit) =>
          unit.matchingGolden?.value === value ? (
            <span key={unit.id} className="w-fit">
              <Avatar className="h-8 w-8 md:h-12 md:w-12" title={unit.name}>
                <AvatarImage alt={unit.name} src={unit.icon} />
                <AvatarFallback>
                  <img src={unit.src} />
                </AvatarFallback>
              </Avatar>
            </span>
          ) : null
        )}
      </div>
    </TableCell>
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
    <div className="flex items-center justify-center">
      <div className="rounded-lg shadow-md sm:m-12">
        <div className="p-2 sm:p-8">
          <div className="flex items-center gap-10">
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
          <div className="py-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Preferuje</TableHead>
                  <TableHead className="text-center">Wymaksowana</TableHead>
                  <TableHead className="text-center">Posiadam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <List units={golden} value="3" />
                  <List units={golden} value="2" />
                  <List units={golden} value="1" />
                </TableRow>
                <TableRow>
                  <List units={heroic} value="3" />
                  <List units={heroic} value="2" />
                  <List units={heroic} value="1" />
                </TableRow>
                <TableRow>
                  <List units={blue} value="3" />
                  <List units={blue} value="2" />
                  <List units={blue} value="1" />
                </TableRow>
                <TableRow>
                  <List units={green} value="3" />
                  <List units={green} value="2" />
                  <List units={green} value="1" />
                </TableRow>
                <TableRow>
                  <List units={grey} value="3" />
                  <List units={grey} value="2" />
                  <List units={grey} value="1" />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
