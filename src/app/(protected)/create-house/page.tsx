"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface HouseProps {
  name: string;
  description: string;
  country: string;
  discordLink: string;
  avatar: string;
  server: string;
}

const HOUSE_PUBLIC_DATA = {
  name: "",
  description: "",
  country: "",
  discordLink: "",
  avatar: "",
  members: 0,
  server: "",
};

const CreateHousePage = () => {
  const [house, setHouse] = useState<HouseProps>(HOUSE_PUBLIC_DATA);

  const createHouse = async () => {
    try {
      const response = await fetch("/api/house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(house),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error occurred:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Success:", responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="p-4">
      <h1>Create House</h1>
      <div>
        <Label>House Name</Label>
        <Input
          value={house.name}
          onChange={(e) =>
            setHouse((prev) => ({ ...prev, name: e.target.value }))
          }
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
      <Button className="m-6" onClick={() => createHouse()}>
        Create House
      </Button>
    </div>
  );
};
export default CreateHousePage;
