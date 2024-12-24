"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ReactLoading from "react-loading";
import WizardForm from "@/feature/survey/wizard-form";

const Page: React.FC = () => {
  const { data } = useSession();
  if (!data)
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <ReactLoading type="spinningBubbles" color="#fff" />
      </div>
    );
  return <WizardForm user_id={data.user.id} avatar={data.user.image ?? ""} />;
};
export default Page;
