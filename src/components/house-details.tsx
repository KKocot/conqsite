import { HouseDetails } from "@/lib/get-data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "react-toastify";
import { useState } from "react";

interface HouseFormProps {
  data: HouseDetails;
}

const HouseDetailsForm = ({ data }: HouseFormProps) => {
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
        console.error("Error occurred:", errorData);
      } else {
        console.log("Success:", await response.json());
        toast.success("House details saved");
      }
    } catch (error) {
      console.error("Error adding:", error);
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
        <Label>House Name</Label>
        <Input
          value={houseDetails.name}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={true}
        />
      </div>
      <div>
        <Label>House Description</Label>
        <Textarea
          value={houseDetails.description}
          onChange={(e) =>
            setHouseDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        {validation.descriptionTooLong ? <p>Description is too long</p> : null}
      </div>
      <div>
        <Label>Country</Label>
        <Input
          value={houseDetails.country}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, country: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Discord Link</Label>
        <Input
          value={houseDetails.discordLink}
          onChange={(e) =>
            setHouseDetails((prev) => ({
              ...prev,
              discordLink: e.target.value,
            }))
          }
        />
        {validation.wrongDiscordLink ? <p>Discord link is incorrect</p> : null}
      </div>
      <div>
        <Label>Avatar</Label>
        <Input
          value={houseDetails.avatar}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, avatar: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Server</Label>
        <Input
          value={houseDetails.server}
          onChange={(e) =>
            setHouseDetails((prev) => ({ ...prev, server: e.target.value }))
          }
        />
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
        Save Details
      </Button>
    </div>
  );
};

export default HouseDetailsForm;
