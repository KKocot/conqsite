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

interface UserForm {
  house: string;
}

const UserForm: React.FC<UserForm> = ({ house }) => {
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
        console.error("Error occurred:", errorData);
      } else {
        setUser({
          discordNick: "",
          discordId: "",
          house: house,
          role: "",
        });
        console.log("Success:", await response.json());
      }
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  return (
    <div className="flex gap-2 my-6">
      <div>
        <Input
          className="w-[120px]"
          placeholder="Nick"
          value={user.discordNick}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, discordNick: e.target.value }))
          }
        />
      </div>
      <div>
        <Input
          className="w-[120px]"
          placeholder="Discord ID"
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
            <SelectValue placeholder="Pick a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HighCommand">HighCommand</SelectItem>
            <SelectItem value="RightHand">RightHand</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={disabled} className="w-fit self-end" onClick={onAdd}>
        Add To List
      </Button>
    </div>
  );
};

export default UserForm;
