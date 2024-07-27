"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ReactLoading from "react-loading";
import WizardForm from "@/components/wizard-form";

const Page: React.FC = () => {
  const { data } = useSession();
  if (!data) return <ReactLoading type="spinningBubbles" color="#fff" />;
  return <WizardForm user_id={data?.user.id} updateForm={true} />;
};
export default Page;
