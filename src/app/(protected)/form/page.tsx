"use client";

import UnitsForm from "@/components/units-form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
  const [whitelist, setWhitelist] = useState<
    {
      idDiscord: string;
      usernameDiscord: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  const { data: userData } = useSession();
  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const response = await fetch("/api/whitelist");
        const data = await response.json();
        setWhitelist(data.whitelist);
      } catch (error) {
        console.error("Error fetching whitelist:", error);
      }
    };

    fetchWhitelist();
  }, []);
  if (whitelist.length !== 0 && userData) {
    const isWhitelisted =
      whitelist.find(
        (whitelistedUser: { idDiscord: string }) =>
          whitelistedUser.idDiscord === userData.user.id
      ) || null;
    return isWhitelisted ? (
      <UnitsForm
        username={isWhitelisted.usernameDiscord}
        user_id={isWhitelisted.idDiscord}
      />
    ) : (
      <div className="text-center">
        Jesli nalezysz do KoP, a nie widzisz ankiety, napisz do rekrutera o
        pomoc
      </div>
    );
  }
};

export default Page;
