"use client";

import { Button } from "@/components/ui/button";
import UnitsForm from "@/components/units-form";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Page: React.FC = () => {
  const [login, setLogin] = React.useState(false);
  return (
    <div>
      {!login ? (
        <div className="flex flex-col items-center justify-center">
          <div>Czesc kliknij zeby sie zalogowac</div>
          <Button onClick={() => signIn("discord")}>Zaloguj</Button>
        </div>
      ) : (
        <UnitsForm />
      )}
    </div>
  );
};

export default Page;
