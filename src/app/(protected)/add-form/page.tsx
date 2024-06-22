"use client";

import { Input } from "@/components/ui/input";
import UnitsForm from "@/components/units-form";
import React from "react";

const Page: React.FC = () => {
  const [discordId, setDiscordId] = React.useState<string>("");
  return (
    <div>
      <Input
        placeholder="Discord ID"
        type="number"
        value={discordId}
        onChange={(e) => setDiscordId(e.target.value)}
      />
      {discordId.length > 17 ? <UnitsForm user_id={discordId} /> : null}
    </div>
  );
};
export default Page;
