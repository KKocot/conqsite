"use client";

import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React from "react";
import { adduser_whitelist } from "@/assets/whitelists";
import WizardForm from "@/components/wizard-form";
import { useTranslations } from "next-intl";

const Page: React.FC = () => {
  const t = useTranslations("AddForm");
  const { data } = useSession();
  const user_id = data ? data?.user.id : "";
  const [discordId, setDiscordId] = React.useState<string>("");
  return adduser_whitelist.includes(user_id) ? (
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
