"use client";

import UnitsForm from "@/components/units-form";
import React from "react";
import { useSession } from "next-auth/react";

const Page: React.FC = () => {
  const { data } = useSession();
  if (!data) return <div>Loading</div>;
  return <UnitsForm user_id={data?.user.id} />;
};

export default Page;
