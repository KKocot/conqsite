"use client";

import { useSession } from "next-auth/react";
import Content from "./content";

const CreateHousePage = () => {
  const user = useSession();
  if (!user?.data || !user.data.user.id) return <div>No Data</div>;
  return <Content username={user.data.user.id} />;
};
export default CreateHousePage;
