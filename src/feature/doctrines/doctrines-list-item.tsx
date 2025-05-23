"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const DoctrinesLisItem = ({ doctrine }: { doctrine: DoctrineType }) => {
  const statsList = doctrine.stats.split(". ").filter(Boolean);
  return (
    <Card className="w-[260px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg h-14">{doctrine.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-64 h-32 flex justify-center items-center">
          <Avatar className="w-1/2 h-full rounded-none">
            <AvatarImage src={doctrine.img} alt={`${doctrine.name} avatar`} />
            <AvatarFallback>{doctrine.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <ul className="mt-2">
          {statsList.map((stat, index) => (
            <li key={index} className="text-sm">
              {stat}
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="flex-grow" />
      <Separator className="w-full my-4" />
      <CardFooter className="flex flex-col">
        <span className="text-sm font-semibold">For Unit:</span>
        {doctrine.forUnit.map((unit, i) => (
          <Link
            href={
              doctrine.dedicated === "unit"
                ? `/unit/${unit.replaceAll(" ", "_")}`
                : `/dashboard/units`
            }
            key={i}
          >
            - {unit}
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
};
export default DoctrinesLisItem;
