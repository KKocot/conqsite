import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HouseCard from "@/feature/house-settings/house-card";
import { Badge } from "@/lib/get-data";
import { servers } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

const defaultCard = {
  name: "House",
  description: "House description",
  country: "House country",
  discordLink: "House discordLink",
  avatar: "House avatar",
  server: "House server",
};

const Content = ({ data }: { data: Badge[] }) => {
  const [serverSelect, setServerSelect] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const filteredHouses = useMemo(() => {
    if (serverSelect === "All")
      return data.filter((houses) => (!showAll ? houses.quality === 1 : true));
    return data
      .filter((house) => house.card?.server === serverSelect)
      .filter((house) => (!showAll ? house.quality === 1 : true));
  }, [data, serverSelect, showAll]);
  return (
    <ul className="flex flex-wrap gap-4 my-12 justify-around">
      {filteredHouses.map((house) => (
        <HouseCard
          key={house.house}
          house={house.card ?? defaultCard}
          badgesData={house}
        />
      ))}
      {!showAll ? (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => {
            setShowAll(true);
          }}
        >
          Show all houses
        </Button>
      ) : null}
      <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-4 shadow-lg w-64 z-50">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-muted-foreground" />
          <Select onValueChange={setServerSelect} value={serverSelect}>
            <SelectTrigger className="self-end mx-4">
              <SelectValue>{serverSelect}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[...servers, "All"]?.map((server) => (
                <SelectItem key={server} value={server}>
                  {server}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </ul>
  );
};
export default Content;
