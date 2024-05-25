"use client";

import UnitsForm from "@/components/units-form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
  const [whitelist, setWhitelist] = useState([]);
  const { data } = useSession();

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
  if (whitelist.length === 0 && !data) {
    <div>loading</div>;
  }
  return <UnitsForm />;
};

export default Page;
