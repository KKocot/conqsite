"use client";

import React from "react";
import { useSession } from "next-auth/react";
import WizardForm from "@/feature/survey/wizard-form";
import LoadingComponent from "@/feature/ifs/loading";

const Page: React.FC = () => {
  const { data } = useSession();
  if (!data) return <LoadingComponent />;
  return <WizardForm user_id={data.user.id} avatar={data.user.image ?? ""} />;
};
export default Page;
