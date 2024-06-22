"use client";

import { Input } from "@/components/ui/input";
import UnitsForm from "@/components/units-form";
import { useSession } from "next-auth/react";
import React from "react";
import { adduser_whitelist } from "@/assets/whitelists";
const Page: React.FC = () => {
  const { data } = useSession();
  const user_id = data ? data?.user.id : "";
  const [discordId, setDiscordId] = React.useState<string>("");
  console.log(adduser_whitelist.includes(user_id));
  return adduser_whitelist.includes(user_id) ? (
    <div>
      <Input
        placeholder="Discord ID"
        type="number"
        value={discordId}
        onChange={(e) => setDiscordId(e.target.value)}
      />
      {discordId.length > 17 ? <UnitsForm user_id={discordId} /> : null}
    </div>
  ) : (
    <div className="flex justify-center my-56">Nie masz dostepu</div>
  );
};
export default Page;
