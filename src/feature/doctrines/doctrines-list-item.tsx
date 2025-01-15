"use client";

import { Doctrine } from "@/assets/doctrines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DoctrinesLisItem = ({ doctrine }: { doctrine: Doctrine }) => {
  const statsList = doctrine.stats.split(". ").filter(Boolean);
  return (
    <Card className="w-[260px]">
      <CardHeader>
        <CardTitle className="text-lg h-14">{doctrine.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          className="justify-self-center w-[90px] h-24"
          src={doctrine.img}
          alt={doctrine.name}
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
