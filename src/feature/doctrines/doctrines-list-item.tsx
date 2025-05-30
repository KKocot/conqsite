"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DoctrineType } from "@/lib/get-data";
import Link from "next/link";
import Image from "next/image";
import { unitTypes } from "../units/list-tab";

const DoctrinesLisItem = ({ doctrine }: { doctrine: DoctrineType }) => {
  const statsList = doctrine.stats.split(". ").filter(Boolean);
  return (
    <Card className="w-[260px] flex flex-col">
      <Link
        href={`/dashboard/doctrines/${doctrine.name}`}
        className="hover:bg-accent/10"
      >
        <CardHeader>
          <CardTitle className="text-lg h-14">{doctrine.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_IMAGES_IP_HOST
            }/images/doctrines/${doctrine.name
              .toLowerCase()
              .replace(/[ ':]/g, "-")}.png`}
            alt={`${doctrine.name} avatar`}
            width={256}
            height={256}
          />
          <ul className="mt-2">
            {statsList.map((stat, index) => (
              <li key={index} className="text-sm">
                {stat}
              </li>
            ))}
          </ul>
        </CardContent>
        <div className="flex-grow" />
      </Link>
      <Separator className="w-full my-4" />
      <CardFooter className="flex flex-col">
        <span className="text-sm font-semibold">For Unit:</span>
        {doctrine.forUnit.map((unit, i) => (
          <Link
            href={
              doctrine.dedicated === "all"
                ? `/dashboard/units`
                : doctrine.dedicated === "group" && unitTypes.includes(unit)
                ? `/dashboard/units?card=fillList&sort=${unit}`
                : `/unit/${unit.replaceAll(" ", "_")}`
            }
            key={i}
            className="hover:underline hover:text-accent"
          >
            - {unit}
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
};
export default DoctrinesLisItem;
