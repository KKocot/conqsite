"use client";

import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React from "react";
import WizardForm from "@/components/wizard-form";
import { useTranslations } from "next-intl";
import { useRolesContext } from "@/components/providers/globalData";

const Page: React.FC = () => {
  const t = useTranslations("AddForm");
  const { data } = useSession();
  const user_id = data ? data?.user.id : "";
  const [discordId, setDiscordId] = React.useState<string>("");
  const commanders = useRolesContext();

  return commanders
    .filter((e) => e.role === "HouseLeader" || e.role === "RightHand")
    .some((e) => e.discordId === user_id) ? (
    <div>
      <Input
        placeholder="Discord ID"
        type="number"
        value={discordId}
        onChange={(e) => setDiscordId(e.target.value)}
      />
      {discordId.length > 17 ? <WizardForm user_id={discordId} /> : null}
    </div>
  ) : (
    <div className="flex justify-center my-56">{t("you_have_no_access")}</div>
  );
};
export default Page;
