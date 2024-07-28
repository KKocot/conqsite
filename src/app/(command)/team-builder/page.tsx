"use client";

import {
  command_whitelist_erebus,
  command_whitelist_kov,
} from "@/assets/whitelists";
import { getCloserDay } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
// const next_tw = getCloserDay();
const next_tw = "2024-07-27";

const Page: React.FC = () => {
  const { data: commander } = useSession();
  const [signup, setSignup] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchLineup = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/signup/${next_tw}`);
      const data = await response.json();
      const lineups = command_whitelist_kov.includes(commander?.user?.id ?? "")
        ? {
            lineup_2: data.signup.lineup_2,
            lineup_3: data.signup.lineup_3,
            lineup_4: data.signup.lineup_4,
          }
        : command_whitelist_erebus.includes(commander?.user?.id ?? "")
        ? { lineup_1: data.signup.lineup_1 }
        : null;
      setSignup(lineups);
      console.log(lineups);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (commander?.user.id) fetchLineup();
  }, [commander?.user.id]);

  if (loading && commander) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading color="#94a3b8" />
      </div>
    );
  }

  return <div className="flex flex-col gap-5 p-2"></div>;
};

export default Page;
