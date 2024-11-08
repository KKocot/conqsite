"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Loading from "react-loading";
import Content from "./content";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getRoleById } from "@/lib/get-data";

const Page = () => {
  const t = useTranslations("SettingsPage");
  const { data: commander } = useSession();
  const [house, setHouse] = useState<string | undefined>(undefined);
  const { data: command_list, isLoading: command_listIsLoading } = useQuery({
    queryKey: ["command_list", commander?.user.id],
    queryFn: () => getRoleById(commander?.user.id ?? ""),
    enabled: !!commander?.user.id,
  });
  if (!command_list || command_listIsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  const houses = command_list.filter((e) => e.discordId === commander?.user.id);
  const defaultHouse = houses.length === 1 ? houses[0].house : undefined;

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
// TODO tranlate
