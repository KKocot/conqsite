import { HouseProps } from "@/app/houses/page";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "react-toastify";

interface HouseFormProps {
  house: HouseProps;
  setHouse: React.Dispatch<React.SetStateAction<HouseProps>>;
}

const HouseDetails = ({ house, setHouse }: HouseFormProps) => {
  const saveDetails = async () => {
    try {
      const response = await fetch(`/api/house?name=${house.name}`, {
        method: "POST",
        body: JSON.stringify({ ...house, id: house.name }),
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
    descriptionTooLong: house.description.length > 250,
    wrongDiscordLink:
      house.discordLink.length > 0 && !house.discordLink.includes("discord.gg"),
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <Label>House Name</Label>
        <Input
          value={house.name}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={true}
        />
      </div>
      <div>
        <Label>House Description</Label>
        <Textarea
          value={house.description}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        {validation.descriptionTooLong ? <p>Description is too long</p> : null}
      </div>
      <div>
        <Label>Country</Label>
        <Input
          value={house.country}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, country: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Discord Link</Label>
        <Input
          value={house.discordLink}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, discordLink: e.target.value }))
          }
        />
        {validation.wrongDiscordLink ? <p>Discord link is incorrect</p> : null}
      </div>
      <div>
        <Label>Avatar</Label>
        <Input
          value={house.avatar}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, avatar: e.target.value }))
          }
        />
      </div>
      <div>
        <Label>Server</Label>
        <Input
          value={house.server}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, server: e.target.value }))
          }
        />
      </div>
      <Button
        disabled={
          validation.descriptionTooLong ||
          validation.wrongDiscordLink ||
          !house.name ||
          !house.server
        }
        className="w-fit self-center"
        onClick={saveDetails}
      >
        Save Details
      </Button>
    </div>
  );
};

export default HouseDetails;
