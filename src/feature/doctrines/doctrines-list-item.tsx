"use client";

import { Doctrine } from "@/assets/doctrines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const DoctrinesLisItem = ({ doctrine }: { doctrine: Doctrine }) => {
  const statsList = doctrine.stats.split(". ").filter(Boolean);
  return (
    <Card className="w-[260px]">
      <CardHeader>
        <CardTitle className="text-lg h-14">{doctrine.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          className="justify-self-center"
          src={doctrine.img}
          alt={doctrine.name}
          width={91}
          height={100}
        />
        <ul className="mt-2">
          {statsList.map((stat, index) => (
            <li key={index} className="text-sm">
              {stat}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
export default DoctrinesLisItem;
