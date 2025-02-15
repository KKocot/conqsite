"use client";

import { useSession } from "next-auth/react";
import Content from "./content";
import NoData from "@/feature/ifs/no-data";

const CreateHousePage = () => {
  const user = useSession();
  if (!user?.data || !user.data.user.id) return <NoData />;
  return <Content username={user.data.user.id} />;
};
export default CreateHousePage;
