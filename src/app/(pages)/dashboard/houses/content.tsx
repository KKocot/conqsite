import { Button } from "@/components/ui/button";
import HouseCard from "@/feature/house-settings/house-card";
import { Badge } from "@/lib/get-data";
import { useState } from "react";

const defaultCard = {
  name: "House",
  description: "House description",
  country: "House country",
  discordLink: "House discordLink",
  avatar: "House avatar",
  server: "House server",
};

const Content = ({ data }: { data: Badge[] }) => {
  const [houses, setHouses] = useState<Badge[]>(
    data.filter((house) => house.quality === 1)
  );
  return (
    <ul className="flex flex-wrap gap-4 my-12 justify-around">
      {houses.map((house) => (
        <HouseCard
          key={house.house}
          house={house.card ?? defaultCard}
          badgesData={house}
        />
      ))}
      {data.length !== houses.length ? (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => {
            setHouses(data);
          }}
        >
          Show all houses
        </Button>
      ) : null}
    </ul>
  );
};
export default Content;
