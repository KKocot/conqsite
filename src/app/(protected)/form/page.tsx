"use client";

import UnitsForm from "@/components/units-form";
import React from "react";
import { useSession } from "next-auth/react";
import ReactLoading from "react-loading";

const Page: React.FC = () => {
  const { data } = useSession();
  if (!data) return <ReactLoading type="spinningBubbles" color="#fff" />;
  return <UnitsForm user_id={data?.user.id} />;
};
export default Page;
