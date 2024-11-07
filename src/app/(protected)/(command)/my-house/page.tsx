"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { rolesQueryOptions } from "@/queries/roles.query";
import Content from "./content";
import { Button } from "@/components/ui/button";

const Page: React.FC = () => {
  const { data: commander } = useSession();
  const { data: command_list = [] } = useQuery(rolesQueryOptions());
  const [house, setHouse] = useState<string | undefined>(undefined);
  const houses = command_list.filter((e) => e.discordId === commander?.user.id);
  console.log(houses);
  const defaultHouse = houses.length === 1 ? houses[0].house : undefined;
  console.log(defaultHouse);
  return (
    <div>
      {defaultHouse ? (
        <Content house={defaultHouse} />
      ) : !house ? (
        <div className="gap-4 flex mt-40 flex-col items-center h-screen">
          <h1 className="text-2xl font-blod">Choose a house</h1>
          <div className="flex gap-4">
            {houses.map((e) => (
              <Button key={e.house} onClick={() => setHouse(e.house)}>
                {e.house}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <Content house={house} />
      )}
    </div>
  );
};

export default Page;
