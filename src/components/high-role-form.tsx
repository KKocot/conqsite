import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Roles } from "@/lib/get-data";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface UserForm {
  house: string;
}

const UserForm: React.FC<UserForm> = ({ house }) => {
  const t = useTranslations("SettingsPage");
  const [user, setUser] = useState<Roles>({
    discordNick: "",
    discordId: "",
    house: house,
    role: "",
  });

  const disabled = !user.discordNick || !user.discordId || !user.role;

  const onAdd = async () => {
    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(t("error_occurred"), errorData);
      } else {
        setUser({
          discordNick: "",
          discordId: "",
          house: house,
          role: "",
        });
        console.log(t("success"), await response.json());
      }
    } catch (error) {
      console.error(t("error_adding"), error);
    }
  };

  return (
    <div className="flex gap-2 my-6">
      <div>
        <Input
          className="w-[120px]"
          placeholder={t("nick_placeholder")}
          value={user.discordNick}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, discordNick: e.target.value }))
          }
        />
      </div>
      <div>
        <Input
          className="w-[120px]"
          placeholder={t("discord_id_placeholder")}
          value={user.discordId}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, discordId: e.target.value }))
          }
        />
      </div>
      <div>
        <Select
          onValueChange={(e) => setUser((prev) => ({ ...prev, role: e }))}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t("role_placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HighCommand">{t("high_command")}</SelectItem>
            <SelectItem value="RightHand">{t("right_hand")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={disabled} className="w-fit self-end" onClick={onAdd}>
        {t("add_to_list")}
      </Button>
    </div>
  );
};

export default UserForm;
