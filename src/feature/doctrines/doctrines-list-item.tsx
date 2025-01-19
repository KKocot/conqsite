"use client";

import { Doctrine } from "@/assets/doctrines";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const DoctrinesLisItem = ({ doctrine }: { doctrine: Doctrine }) => {
  const statsList = doctrine.stats.split(". ").filter(Boolean);
  return (
    <Card className="w-[260px]">
      <CardHeader>
        <CardTitle className="text-lg h-14">{doctrine.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-1/2 h-1/2 rounded-none">
          <AvatarImage src={doctrine.img} alt={`${doctrine.name} avatar`} />
          <AvatarFallback>
            <Image src="/logo.png" alt="avatar" width={362} height={362} />
          </AvatarFallback>
        </Avatar>
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
