import { HouseDetails } from "@/lib/get-data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servers } from "@/lib/utils";
interface HouseFormProps {
  data: HouseDetails;
}

const HouseDetailsForm = ({ data }: HouseFormProps) => {
  const t = useTranslations("SettingsPage");
  const [houseDetails, setHouseDetails] = useState<HouseDetails>(data);
  const saveDetails = async () => {
    try {
      const response = await fetch(`/api/house?name=${houseDetails.name}`, {
        method: "POST",
        body: JSON.stringify({ ...houseDetails, id: houseDetails.name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(t("error_occurred"), errorData);
      } else {
        console.log(t("success"), await response.json());
        toast.success(t("house_details_saved"));
      }
    } catch (error) {
      console.error(t("error_adding"), error);
    }
  };

  const validation = {
    descriptionTooLong: houseDetails.description.length > 250,
    wrongDiscordLink:
      houseDetails.discordLink.length > 0 &&
      !houseDetails.discordLink.includes("discord.gg"),
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <Label>{t("house_name")}</Label>
        <Input
          value={houseDetails.name}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={true}
        />
      </div>
      <div>
        <Label>{t("house_description_title")}</Label>
        <Textarea
          value={houseDetails.description}
          onChange={(e) =>
            setHouseDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        {validation.descriptionTooLong ? (
          <p>{t("description_too_long")}</p>
        ) : null}
      </div>
      <div>
        <Label>{t("country")}</Label>
        <Input
          value={houseDetails.country}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, country: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>{t("discord_link")}</Label>
        <Input
          value={houseDetails.discordLink}
          onChange={(e) =>
            setHouseDetails((prev) => ({
              ...prev,
              discordLink: e.target.value,
            }))
          }
        />
        {validation.wrongDiscordLink ? (
          <p>{t("discord_link_incorrect")}</p>
        ) : null}
      </div>
      <div>
        <Label>{t("avatar")}</Label>
        <Input
          value={houseDetails.avatar}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, avatar: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>{t("server")}</Label>
        <Select
          value={houseDetails.server}
          onValueChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, server: e }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a server" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {servers.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        disabled={
          validation.descriptionTooLong ||
          validation.wrongDiscordLink ||
          !houseDetails.name ||
          !houseDetails.server
        }
        className="w-fit self-center"
        onClick={saveDetails}
      >
        {t("save_details")}
      </Button>
    </div>
  );
};

export default HouseDetailsForm;
